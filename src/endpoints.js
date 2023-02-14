const isProduction = process.env.NODE_ENV === 'production'

const endpoints = {
  createMessage: `${
    isProduction ? '/api/post' : 'http://localhost:5000/api/post'
  }`,
  getMessage: `${
    isProduction ? '/api/message' : 'http://localhost:5000/api/message'
  }`
}

export default endpoints
