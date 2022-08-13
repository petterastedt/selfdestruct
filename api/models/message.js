const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
require('dotenv').config()

const schema = new mongoose.Schema(
  {
    isActive: Boolean,
    isFirstReq: Boolean,
    name: String,
    secret: String,
    textContent: String,
    url: String,
    timeLeft: Number,
    options: Object,
    timeOptions: Object
  },
  { timestamps: true }
)

const encKey = process.env.ENC_KEY
const signKey = process.env.SIGN_KEY

schema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: signKey,
  encryptedFields: ['textContent', 'name', 'url']
})

const Message = new mongoose.model('Message', schema)

module.exports = Message
