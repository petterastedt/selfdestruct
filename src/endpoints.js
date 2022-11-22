const isProcution = process.env.NODE_ENV === 'production'

const endpoints = {
  createMessage: `${
    isProcution ? '/api/post' : 'http://localhost:5000/api/post'
  }`,
  getMessage: `${
    isProcution ? '/api/message' : 'http://localhost:5000/api/message'
  }`
}

export default endpoints
