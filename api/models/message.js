const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    isActive: { type: Boolean, required: true },
    isFirstReq: { type: Boolean, required: true },
    name: { type: String, required: false },
    secret: { type: String, required: true },
    textContent: { type: String, required: true },
    url: { type: String, required: true },
    timeLeft: { type: Number, required: true },
    options: Object,
    timeOptions: Object
  },
  { timestamps: true }
)

const Message = new mongoose.model('Message', schema)

module.exports = Message
