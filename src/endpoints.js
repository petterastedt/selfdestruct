const isProduction = process.env.NODE_ENV === 'production'

const endpoints = {
  createMessage: `${!isProduction || 'http://localhost:5000'}/api/post`,
  getMessage: `${!isProduction || 'http://localhost:5000'}/api/message`
}

//

export default endpoints
