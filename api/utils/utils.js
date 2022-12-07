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

// CREATE MESSAGE OBJECT
const createMessageObject = (req) => {
  const { textContent, name, aliveFor, options } = req.body
  const { startImmediately, startTimerOnFirstReq, killOnFirstReq } = options
  const secret = crypto.randomBytes(3).toString('hex')

  const timeInMillisec = convertToMillisec(
    aliveFor.hrs,
    aliveFor.min,
    aliveFor.sec
  )

  const url = `${req.get('origin').replace('www.', '')}/message/${secret}`

  let destroyAt

  if (options.startImmediately) {
    destroyAt = getDestroyTime(timeInMillisec)
  }

  return {
    name,
    secret,
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
  stripItem
}
