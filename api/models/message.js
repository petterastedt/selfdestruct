const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
require('dotenv').config()

const schema = new mongoose.Schema({
  isActive: Boolean,
  isFirstReq: Boolean,
  name: String,
  secret: String,
  textContent: String,
  url: String,
  timeLeft: Number,
  options: Object,
  timeOptions : Object
}, { timestamps: true })

schema.plugin(encrypt, { encryptionKey: process.env.ENC_KEY, signingKey: process.env.SIGN_KEY, encryptedFields: ['textContent', 'name'] })

const message = new mongoose.model('Message', schema)

module.exports = message
