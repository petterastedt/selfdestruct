import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Home from '../pages/home.js'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from './../mocks/handlers.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Create message tests', () => {
  const setup = () => {
    const utils = render(<Home />)

    return {
      elements: {
        feedbackError: () => screen.getByTestId('form-feedback-error'),
        feedbackSuccess: () => screen.getByTestId('form-feedback-success'),
        feedbackUrl: () => screen.getByTestId('form-feedback-url'),
        feedbackSubmitting: () => screen.getByText('Creating message..'),
        submitButton: () => screen.getByText('Create message'),
        textBox: () => screen.getByRole('textbox')
      },
      ...utils
    }
  }

  test('Should create message and show feedback if successful', async () => {
    const { elements } = setup()

    expect(elements.textBox()).toBeInTheDocument()

    await userEvent.type(
      elements.textBox(),
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, dolorem!'
    )

    await userEvent.click(elements.submitButton())

    await waitFor(() =>
      expect(elements.feedbackSubmitting()).toBeInTheDocument()
    )

    await waitFor(() => expect(elements.feedbackSuccess()).toBeInTheDocument())
    expect(elements.feedbackUrl()).toBeInTheDocument()
    expect(elements.feedbackUrl()).toHaveTextContent(
      'https://privtext.vercel.app/message/509b6d#'
    )
    expect(elements.submitButton()).toBeDisabled()
  })

  test('Should show error if message creation fails', async () => {
    const { elements } = setup()

    server.use(
      rest.post('http://localhost:5000/api/post', (_, res, context) =>
        res(context.json({ success: false, message: 'Database error!' }))
      )
    )

    await userEvent.type(
      elements.textBox(),
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, dolorem!'
    )

    await userEvent.click(elements.submitButton())

    await waitFor(() => expect(elements.feedbackError()).toBeInTheDocument())
  })

  test('Should show error if no text is entered', async () => {
    const { elements } = setup()

    await userEvent.click(elements.submitButton())

    await waitFor(() => expect(elements.feedbackError()).toBeInTheDocument())
  })
})
