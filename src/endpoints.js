const isProcdution = process.env.NODE_ENV === 'production'

const endpoints = {
  createMessage: `${
    isProcdution ? '/api/post' : 'http://localhost:5000/api/post'
  }`,
  getMessage: `${
    isProcdution ? '/api/message' : 'http://localhost:5000/api/message'
  }`
}

export default endpoints
