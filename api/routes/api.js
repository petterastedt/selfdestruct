const express = require('express')
const router = express.Router()
const Message = require('./../models/message.js')
const messageController = require('./../controllers/message.controller.js')
const utils = require('../utils/utils.js')
const dotenv = require('dotenv')
dotenv.config()

// HANDLE ERRORS
const exceptionHandler = fn => (req, res, next) => {
  fn(req, res).catch((error) => {
    console.log("Error: ", error)
    res.json({
      message: `Server error: ${error}`,
      success: false
    })
    next(error)
  })
}

// CLEANUP ROUTE
router.get(`/${process.env.CLEANUP_URL}`, exceptionHandler(async (req, res) => {
  messageController.cleanupExpired()
  res.sendStatus(200)
}))

// CREATE MESSAGE
router.post("/post", exceptionHandler(async (req, res) => {
  const message = utils.createMessageObject(req)
  Message.create(message, (error, item) => messageController.responseHandler(res, error, item))
}))

// SHOW MESSAGE
router.post("/message", exceptionHandler(async (req, res) => {
  const { secret } = req.query

  Message.find({ 'secret': secret }, (error, item) => {
    if (!error && item.length && item[0].isActive) {
      const { options, timeOptions, isFirstReq } = item[0]

      // START IMMEDIATELY OR START ON FIRST REQUEST, NOT FIRST REQUEST
      if (options.startImmediately || (options.startTimerOnFirstReq && !isFirstReq)) {
        const timeLeft = utils.getTimeLeft(timeOptions.destroyAt)
        item[0].timeLeft = timeLeft

        if (timeLeft < 1) {
          messageController.setInactiveItem(secret, res)
          item[0].isActive = false
        }

        messageController.responseHandler(res, error, item[0])

      // START ON FIRST REQUEST, IS FIRST REQUEST
      } else if (options.startTimerOnFirstReq && isFirstReq) {
        const destroyAt = utils.getDestroyTime(timeOptions.aliveFor)
        messageController.updateItem(secret, destroyAt, timeOptions.aliveFor, res)

      // KILL ON FIRST REQUEST (SECRET MESSAGE)
      } else if (options.killOnFirstReq) {
        messageController.deleteItem(secret, res)
      }
    } else {
      messageController.responseHandler(res, error)
    }
  })
}))

module.exports = router