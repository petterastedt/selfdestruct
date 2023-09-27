const endpoints = {
  createMessage:
    process.env.NODE_ENV === 'production'
      ? '/api/post'
      : 'http://localhost:5000/api/post',
  getMessage:
    process.env.NODE_ENV === 'production'
      ? '/api/message'
      : 'http://localhost:5000/api/message'
}

export default endpoints
