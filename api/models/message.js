const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
const dotenv = require('dotenv')
dotenv.config()

const schema = new mongoose.Schema({
  isActive: Boolean,
  isFirstReq: Boolean,
  name: String,
  secret: String,
  textContent: String,
  url: String,
  timeLeft: Number,
  options: {
    killOnFirstReq: Boolean,
    startTimerOnFirstReq: Boolean,
    startImmediately: Boolean
  },
  timeOptions : {
    createAt: String,
    destroyAt: Object,
    aliveFor: Number,
  }
}, { timestamps: true })

schema.plugin(encrypt, { encryptionKey: process.env.ENC_KEY, signingKey: process.env.SIGN_KEY, encryptedFields: ['textContent'] })

const message = new mongoose.model('Message', schema)

module.exports = message
