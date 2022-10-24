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
        secret: '509b6d',
        textContent,
        timeLeft: 120000,
        timeOptions: { aliveFor: 120000 },
        updatedAt: '2022-08-09T19:47:53.973Z',
        url: 'https://privtext.vercel.app/message/509b6d',
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
    async (_, res, context) => {
      const response = {
        item: {
          textContent:
            '1fbb9bbbd1829273eb254b9da67ad838:45745a6864435374636d44394531563452424e766157414956626150664843756361654845756c6c7976785a6a716879434838446837586c426e6963487957776c5a6b536e6171704a3532326258654b456971456f6e6d6347785431754937306a333366354f593d',
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
