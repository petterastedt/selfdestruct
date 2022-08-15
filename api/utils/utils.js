const moment = require('moment')
const crypto = require('crypto')
require('dotenv').config()

// GET DESTROY TIME
const getDestroyTime = (timeAlive) => {
  const currentTime = new Date()
  const destroyAt = moment(currentTime).add(timeAlive, 'ms').toDate()

  return destroyAt
}

// GET TIME LEFT
const getTimeLeft = (timeAlive) => {
  const currentTime = new Date()
  const endTime = timeAlive
  const difference = endTime.getTime() - currentTime.getTime()

  return difference
}

// CONVERT TIME TO MILLISECONDS
const convertToMillisec = (hours, minutes, seconds) =>
  (hours * 60 * 60 + minutes * 60 + seconds) * 1000

// ENCRYPT SECRET STRING
const encryptSecret = (secret) => {
  const secret_key = process.env.ENC_KEY
  const secret_iv = process.env.SIGN_KEY
  const encryptionMethod = 'AES-256-CBC'

  const key = crypto
    .createHash('sha512')
    .update(secret_key, 'utf-8')
    .digest('hex')
    .slice(0, 32)

  const iv = crypto
    .createHash('sha512')
    .update(secret_iv, 'utf-8')
    .digest('hex')
    .slice(0, 16)

  const encryptor = crypto.createCipheriv(encryptionMethod, key, iv)
  const aes_encrypted =
    encryptor.update(secret, 'utf8', 'base64') + encryptor.final('base64')

  return Buffer.from(aes_encrypted).toString('base64')
}

// CREATE MESSAGE OBJECT
const createMessageObject = (req) => {
  const { textContent, name, aliveFor, options } = req.body
  const { startImmediately, startTimerOnFirstReq, killOnFirstReq } = options
  const secret = crypto.randomBytes(13).toString('hex')
  const secretEncrypted = encryptSecret(secret)

  const timeInMillisec = convertToMillisec(
    aliveFor.hrs,
    aliveFor.min,
    aliveFor.sec
  )

  const url = `${req.get('origin')}/message/${secret}`

  let destroyAt

  if (options.startImmediately) {
    destroyAt = getDestroyTime(timeInMillisec)
  }

  return {
    isActive: true,
    isFirstReq: true,
    name,
    secret: secretEncrypted,
    url,
    textContent,
    timeLeft: timeInMillisec,
    options: {
      killOnFirstReq,
      startTimerOnFirstReq,
      startImmediately
    },
    timeOptions: {
      destroyAt,
      aliveFor: timeInMillisec
    }
  }
}

const stripItem = (item) => {
  const { isActive, name, options, textContent, timeLeft } = item

  return {
    isActive,
    name,
    options,
    textContent,
    timeLeft
  }
}

module.exports = {
  getTimeLeft,
  getDestroyTime,
  convertToMillisec,
  createMessageObject,
  stripItem,
  encryptSecret
}
