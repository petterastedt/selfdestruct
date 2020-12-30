const moment = require('moment')
const crypto = require('crypto')

// GET DESTROY TIME
const getDestroyTime = timeAlive => {
  const currentTime = new Date()
  const destroyAt = moment(currentTime).add(timeAlive, 'ms').toDate()

  return destroyAt
}

// GET TIME LEFT
const getTimeLeft = timeAlive => {
  const currentTime = new Date()
  const endTime = timeAlive
  const difference = (endTime.getTime() - currentTime.getTime())

  return difference
}

// CONVERT TIME TO MILLISECONDS
const convertToMillisec = (hours, minutes, seconds) => (hours * 60 * 60 + minutes * 60 + seconds) * 1000

// CREATE MESSAGE OBJECT

const createMessageObject = req => {
  const { textContent, name, aliveFor, options } = req.body
  const { startImmediately, startTimerOnFirstReq, killOnFirstReq } = options
  const secret = crypto.randomBytes(13).toString('hex')
  const timeInMillisec = convertToMillisec(aliveFor.hrs, aliveFor.min, aliveFor.sec)
  const url = `${req.get('origin')}/message/${secret}`
  let destroyAt

  if (options.startImmediately) {
    destroyAt = getDestroyTime(timeInMillisec)
  }

  return {
    isActive: true,
    isFirstReq: true,
    name,
    secret,
    url,
    textContent,
    timeLeft: timeInMillisec,
    options: {
      killOnFirstReq,
      startTimerOnFirstReq,
      startImmediately,
    },
    timeOptions : {
      destroyAt,
      aliveFor: timeInMillisec
    }
  }
}

module.exports = {
  getTimeLeft,
  getDestroyTime,
  convertToMillisec,
  createMessageObject
}