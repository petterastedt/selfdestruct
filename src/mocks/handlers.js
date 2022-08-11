import { rest } from 'msw'

const handlers = [
  rest.post('http://localhost:5000/api/post', async (req, res, context) => {
    const request = await req.json()
    const { name, options, textContent } = request

    const response = {
      item: {
        createdAt: '2022-08-09T19:47:53.973Z',
        isActive: true,
        isFirstReq: true,
        name,
        options,
        secret: 'a03343cc4ac04579757dab8ae7',
        textContent,
        timeLeft: 120000,
        timeOptions: { aliveFor: 120000 },
        updatedAt: '2022-08-09T19:47:53.973Z',
        url: 'https://privtext.vercel.app/message/a03343cc4ac04579757dab8ae7',
        __v: 0,
        _id: '62f2b9e985c5410010bfd910'
      },
      message: 'Success!',
      success: true
    }

    return res(context.status(200), context.json(response))
  }),
  rest.get(
    'http://localhost:5000/api/message/:secret',
    async (req, res, context) => {
      const response = {
        item: {
          textContent:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, dolorem!',
          timeLeft: 120000,
          options: {
            killOnFirstReq: true,
            startTimerOnFirstReq: false,
            startImmediately: false
          },
          name: 'John doe'
        },
        success: true,
        message: 'Success!'
      }

      return res(context.status(200), context.json(response))
    }
  )
]

export { handlers, rest }
