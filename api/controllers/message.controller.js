const Message = require('./../models/message')
const utils = require('../utils/utils')

// HANDLE RESPONSES
const responseHandler = (res, error, item, errorMsg, successMsg, notFound) => {
  const errorString = errorMsg || 'Database Error!'
  const successString = successMsg || 'Success!'
  const notFoundString = notFound || 'Message not found!'

  if (error) {
    res.json({
      message: errorString,
      success: false
    })
  } else if (!item?.isActive || item.length === 0) {
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
    (error) => {
      if (error) {
        console.log('error', error)
      }
    }
  )
}

// SHOW MESSAGE
const showMessage = (secret, res) => {
  Message.findOne({ secret: secret }, (error, item) => {
    if (error || !item?.isActive) {
      responseHandler(res, error)
    }

    let {
      isActive,
      isFirstReq,
      name,
      options,
      textContent,
      timeOptions,
      secret
    } = item

    // START IMMEDIATELY OR START ON FIRST REQUEST, NOT FIRST REQUEST
    if (
      options.startImmediately ||
      (options.startTimerOnFirstReq && !isFirstReq)
    ) {
      const timeLeft = utils.getTimeLeft(timeOptions.destroyAt)

      if (timeLeft < 1) {
        setInactiveItem(secret)
        isActive = false
      }

      const responseData = {
        isActive,
        name,
        options,
        textContent,
        timeLeft
      }

      responseHandler(res, error, responseData)

      // START ON FIRST REQUEST, IS FIRST REQUEST
    } else if (options.startTimerOnFirstReq && isFirstReq) {
      const destroyAt = utils.getDestroyTime(timeOptions.aliveFor)
      updateItem(secret, destroyAt, timeOptions.aliveFor, res)

      // KILL ON FIRST REQUEST (SECRET MESSAGE)
    } else if (options.killOnFirstReq) {
      deleteItem(secret, res)
    }
  })
}

// CREATE MESSAGE
const createMessage = async (message, res) =>
  Message.create(message, (error, item) => {
    const { url, isActive } = item

    const responseData = {
      isActive,
      url
    }

    responseHandler(res, error, responseData)
  })

// DELETE ITEM
const deleteItem = (secret, res) =>
  Message.findOneAndDelete({ secret: secret }, (error, item) =>
    responseHandler(res, error, utils.stripItem(item))
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
    (error, item) => {
      responseHandler(
        res,
        error,
        utils.stripItem(item),
        'Something went wrong! The message timer was not triggered, try again later.'
      )
    }
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
