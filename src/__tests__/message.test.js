import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Message from '../pages/message.js'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { handlers } from './../mocks/handlers.js'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Open message tests', () => {
  const setup = (messageUrl) => {
    const utils = render(
      <MemoryRouter initialEntries={[messageUrl]}>
        <Message route="message/:secret" />
      </MemoryRouter>
    )

    return {
      elements: {
        feedbackMessageNotFound: () => screen.getByText('Message not found!'),
        loader: () => screen.getByText('Loading'),
        formValidateKey: () => screen.getByTestId('form-validate-key'),
        messageBox: () =>
          screen.getByText(
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, dolorem!'
          ),
        senderName: () => screen.getByText('John doe')
      },
      ...utils
    }
  }

  test('Should open the message if secret matches', async () => {
    const messageUrl = '/message/26de7e#m5g81xkOvgWfvVEJ'
    const { elements } = setup(messageUrl)

    expect(elements.loader()).toBeInTheDocument()

    await waitFor(() => expect(elements.messageBox()).toBeInTheDocument(), {
      timeout: 2500
    })

    expect(elements.messageBox()).toBeInTheDocument()

    expect(elements.senderName()).toBeInTheDocument()
  })

  test('Should show confirm link screen if encryption key is invalid', async () => {
    const messageUrl = '/message/26de7e#m5g81xkOvgWfvVED'
    const { elements } = setup(messageUrl)

    expect(elements.loader()).toBeInTheDocument()

    await waitFor(
      () => expect(elements.formValidateKey()).toBeInTheDocument(),
      {
        timeout: 2500
      }
    )
  })

  test('Should show error if message is not found', async () => {
    server.use(
      rest.get('http://localhost:5000/api/message/:secret', (_, res, context) =>
        res(context.json({ message: 'Message not found!', success: false }))
      )
    )

    const invalidMessageUrl = '/message/509b6d#hCUJ81SBHA88ShA7'

    const { elements } = setup(invalidMessageUrl)

    expect(elements.loader()).toBeInTheDocument()

    await waitFor(
      () => expect(elements.feedbackMessageNotFound()).toBeInTheDocument(),
      {
        timeout: 2500
      }
    )
  })
})
