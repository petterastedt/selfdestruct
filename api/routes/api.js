const express = require('express')
const router = express.Router()
const messageController = require('./../controllers/message.controller')
const utils = require('../utils/utils')
require('dotenv').config()

// HANDLE ERRORS
const exceptionHandler = (fn) => (req, res, next) => {
  fn(req, res).catch((error) => {
    console.log('Error: ', error)
    res.json({
      message: `Server error: ${error}`,
      success: false
    })
    next(error)
  })
}

// CLEANUP ROUTE
router.delete(
  `/${process.env.CLEANUP_URL}`,
  exceptionHandler(async (_req, res) => {
    messageController.cleanupExpired()
    res.sendStatus(200)
  })
)

// CREATE MESSAGE
router.post(
  '/post',
  exceptionHandler(async (req, res) => {
    const message = utils.createMessageObject(req)
    messageController.createMessage(message, res)
  })
)

// SHOW MESSAGE
router.get(
  '/message/:secret',
  exceptionHandler(async (req, res) => {
    const { secret } = req.params
    messageController.showMessage(secret, res)
  })
)

module.exports = router
