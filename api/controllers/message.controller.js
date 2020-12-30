const Message = require('./../models/message.js')

// HANDLE RESPONSES
const responseHandler = (res, error, item, errorMsg, successMsg, notFound) => {
  const errorString = errorMsg ? errorMsg : "Database Error!"
  const successString = successMsg ? successMsg : "Success!"
  const notFoundString = notFound ? notFound : "Message not found!"

  if (error) {
    res.json({
      message: errorString,
      success: false
    })
    console.log('error: ', error)
  } else if (!item || item.length === 0 || !item.isActive) {
    res.json({
      message: notFoundString,
      success: false
    })
    console.log('not found')
  } else {
    res.json({
      item,
      message: successString,
      success: true
    })
    console.log('success')
  }
}

// DELETE EXPIRED AND INACTIVE MESSAGES
const cleanupExpired = async () => {
  Message.deleteMany({
    "timeOptions.destroyAt": {$lte: new Date()}
  }, {new: true}, (error, items) => {
    if (!error) {
      console.log("Cleanup successful!", items)
    } else {
      console.log("Cleanup failed", error)
    }
  })
}

// SET TO INACTIVE
const setInactiveItem = async (secret, res) => {
  Message.findOneAndUpdate({
    'secret': secret
  }, {$set: {
    isActive: false,
  }}, (error, item) => {
    if (error) {
      console.log('error', error)
    }
  })
}

// DELETE ITEM
const deleteItem = async (secret, res) => {
  Message.findOneAndDelete({
    'secret': secret
  }, (error, item) => responseHandler(res, error, item))
}

// UPDATE FIRST REQUEST
const updateItem = async (secret, destroyAt, aliveFor, res) => {
  Message.findOneAndUpdate({
    'secret': secret
  }, {$set: {
    isFirstReq: false,
    timeLeft: aliveFor,
    timeOptions : {
      destroyAt,
      aliveFor
    }
  }}, {new: true}, (error, item) => responseHandler(res, error, item, "Something went wrong! The message timer was not triggered, try again later."))
}

module.exports = {
  cleanupExpired,
  setInactiveItem,
  deleteItem,
  updateItem,
  responseHandler
}