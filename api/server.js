const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./routes/api')
require('dotenv').config()

const port = process.env.PORT || 8080

// DATABASE SETUP
const initDatabaseConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.info(
      `Connected to Mongo database: '${connect.connections[0].name}'`
    )
  } catch (err) {
    console.error('Error connecting to mongo', err)
    process.exit()
  }
}

// EXPRESS SETUP
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
  next()
})

server.use('/api', api)

server.get('/', (_req, res) => res.send('API online, all good! ✌️'))

initDatabaseConnection()

server.listen(port, () => console.info(`Server online!`))
