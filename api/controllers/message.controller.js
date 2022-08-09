const Message = require('./../models/message')
const utils = require('../utils/utils')

// HANDLE RESPONSES
const responseHandler = (res, error, item, errorMsg, successMsg, notFound) => {
  const errorString = errorMsg ? errorMsg : 'Database Error!'
  const successString = successMsg ? successMsg : 'Success!'
  const notFoundString = notFound ? notFound : 'Message not found!'

  if (error) {
    res.json({
      message: errorString,
      success: false
    })
  } else if (!item || item.length === 0 || !item.isActive) {
    res.json({
      message: notFoundString,
      success: false
    })
  } else {
    res.json({
      item,
      message: successString,
      success: true
    })
  }
}

// DELETE EXPIRED AND INACTIVE MESSAGES
const cleanupExpired = () => {
  Message.deleteMany(
    {
      'timeOptions.destroyAt': { $lte: new Date() }
    },
    { new: true },
    (error, items) => {
      if (!error) {
        console.log('Cleanup successful!', items)
      } else {
        console.log('Cleanup failed', error)
      }
    }
  )
}

// SET TO INACTIVE
const setInactiveItem = (secret) => {
  Message.findOneAndUpdate(
    {
      secret: secret
    },
    {
      $set: {
        isActive: false
      }
    },
    (error, item) => {
      if (error) {
        console.log('error', error)
      }
    }
  )
}

// SHOW MESSAGE
const showMessage = (secret, res) => {
  Message.find({ secret: secret }, (error, item) => {
    if (!error && item.length && item[0].isActive) {
      const { options, timeOptions, isFirstReq } = item[0]

      // START IMMEDIATELY OR START ON FIRST REQUEST, NOT FIRST REQUEST
      if (
        options.startImmediately ||
        (options.startTimerOnFirstReq && !isFirstReq)
      ) {
        const timeLeft = utils.getTimeLeft(timeOptions.destroyAt)
        item[0].timeLeft = timeLeft

        if (timeLeft < 1) {
          messageController.setInactiveItem(secret)
          item[0].isActive = false
        }

        responseHandler(res, error, item[0])

        // START ON FIRST REQUEST, IS FIRST REQUEST
      } else if (options.startTimerOnFirstReq && isFirstReq) {
        const destroyAt = utils.getDestroyTime(timeOptions.aliveFor)
        updateItem(secret, destroyAt, timeOptions.aliveFor, res)

        // KILL ON FIRST REQUEST (SECRET MESSAGE)
      } else if (options.killOnFirstReq) {
        deleteItem(secret, res)
      }
    } else {
      responseHandler(res, error)
    }
  })
}

// CREATE MESSAGE
const createMessage = async (message, res) =>
  Message.create(message, (error, item) => responseHandler(res, error, item))

// DELETE ITEM
const deleteItem = (secret, res) =>
  Message.findOneAndDelete({ secret: secret }, (error, item) =>
    responseHandler(res, error, item)
  )

// UPDATE FIRST REQUEST
const updateItem = (secret, destroyAt, aliveFor, res) => {
  Message.findOneAndUpdate(
    {
      secret: secret
    },
    {
      $set: {
        isFirstReq: false,
        timeLeft: aliveFor,
        timeOptions: {
          destroyAt,
          aliveFor
        }
      }
    },
    { new: true },
    (error, item) =>
      responseHandler(
        res,
        error,
        item,
        'Something went wrong! The message timer was not triggered, try again later.'
      )
  )
}

module.exports = {
  cleanupExpired,
  createMessage,
  showMessage,
  setInactiveItem,
  deleteItem,
  updateItem,
  responseHandler
}
