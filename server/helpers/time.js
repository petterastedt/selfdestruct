const moment = require('moment')

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

module.exports = {
  getTimeLeft,
  getDestroyTime,
  convertToMillisec
}