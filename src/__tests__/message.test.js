// import '@testing-library/jest-dom'
// import { render, screen, waitFor } from '@testing-library/react'
// import React from 'react'
// import { BrowserRouter, MemoryRouter } from 'react-router-dom'
// import Message from '../pages/message.js'
// import { setupServer } from 'msw/node'
// import { handlers } from './../mocks/handlers.js'

// const server = setupServer(...handlers)

// beforeAll(() => server.listen())
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())

// describe('Open message tests', () => {
//   const setup = () => {
//     const utils = render(<Message />, { wrapper: BrowserRouter })

//     return {
//       elements: {},
//       ...utils
//     }
//   }

//   test('Should open the message if secret matches', async () => {
//     const { elements } = setup()

//     const messageUrl = '/message/a03343cc4ac04579757dab8ae7'

//     render(
//       <MemoryRouter initialEntries={[messageUrl]}>
//         <Message />
//       </MemoryRouter>
//     )
//   })
// })
