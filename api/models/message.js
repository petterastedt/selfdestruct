const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  isActive: Boolean,
  isFirstReq: Boolean,
  // password: String,
  secret: String,
  textContent: String,
  url: String,
  timeLeft: Number,
  options: {
    killOnFirstReq: Boolean,
    startTimerOnFirstReq: Boolean,
    startImmediately: Boolean,
    // public: Boolean,
    // passwordProtected: Boolean
  },
  timeOptions : {
    createAt: String,
    destroyAt: Object,
    aliveFor: Number,
  }
}, { timestamps: true })

// UserSchema.methods.generateHash = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

// UserSchema.methods.validPassword = function(password: string) {
//   return bcrypt.compareSync(password, this.password)
// }

const message = new mongoose.model('Message', schema)

module.exports = message
