const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const Message = require('./../models/message.js')
const helpers = require('./../helpers/time.js')
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
const setInactiveItem = async secret => {
  Message.findOneAndUpdate({
    'secret': secret
  }, {$set: {
    isActive: false,
  }}, {new: true}, (error, item) => {
    if (!error && item) {
      console.log("Item is now Inactive", item)
    } else {
      console.log("Inactive failed :(((", error)
    }
  })
}

// DELETE ITEM
const deleteItem = async secret => {
  Message.findOneAndDelete({
    'secret': secret
  }, (error, item) => {
    if (!error && item) {
      console.log("item deleted", item)
    } else {
      console.log("delete failed :(((", error)
    }
  })
}

// CLEANUP ROUTE
router.get(`/${process.env.CLEANUP_URL}`, exceptionHandler(async (req, res) => {
  cleanupExpired()

  res.sendStatus(200)
}))

// SHOW MESSAGE
router.post("/message", exceptionHandler(async (req, res) => {
  const { secret } = req.query

  Message.find({
    'secret': secret
  }, (error, item) => {
    if (!error && item.length && item[0].isActive) {
      const { options, timeOptions, isFirstReq } = item[0]

      // START IMMEDIATELY OR START ON FIRST REQUEST, NOT FIRST REQUEST
      if (options.startImmediately || (options.startTimerOnFirstReq && !isFirstReq)) {
        const timeLeft = helpers.getTimeLeft(item[0].timeOptions.destroyAt)
        item[0].timeLeft = timeLeft

        if (timeLeft < 1) {
          setInactiveItem(secret)
          item[0].isActive = false
        }

        responseHandler(res, error, item[0])

      // START ON FIRST REQUEST, IS FIRST REQUEST
      } else if (options.startTimerOnFirstReq && isFirstReq) {
        const destroyAt = helpers.getDestroyTime(timeOptions.aliveFor)

        Message.findOneAndUpdate({
          'secret': secret
        }, {$set: {
          isFirstReq: false,
          timeLeft: timeOptions.aliveFor,
          timeOptions : {
            destroyAt: destroyAt,
            aliveFor: timeOptions.aliveFor
          }
        }}, {new: true}, (error, item) => responseHandler(res, error, item, "Something went wrong! The message timer was not triggered, try again later."))

      // KILL ON FIRST REQUEST (SECRET MESSAGE)
      } else if (options.killOnFirstReq) {
        deleteItem(secret)
        responseHandler(res, error, item[0])
      }
    } else {
      responseHandler(res, error)
    }
  })
}))

// CREATE MESSAGE
router.post("/post", exceptionHandler(async (req, res) => {
  const { textContent, name, aliveFor, options } = req.body
  const { startImmediately, startTimerOnFirstReq, killOnFirstReq } = req.body.options
  const secret = crypto.randomBytes(13).toString('hex')
  const timeInMillisec = helpers.convertToMillisec(aliveFor.hrs, aliveFor.min, aliveFor.sec)
  const url = `${req.get('origin')}/message/${secret}`
  let destroyAt

  if (options.startImmediately) {
    destroyAt = helpers.getDestroyTime(timeInMillisec)
  }

  const message = {
    isActive: true,
    isFirstReq: true,
    // password,
    name,
    secret,
    url,
    textContent,
    timeLeft: timeInMillisec,
    options: {
      killOnFirstReq,
      startTimerOnFirstReq,
      startImmediately,
      public: true,
      // passwordProtected
    },
    timeOptions : {
      // createAt,
      destroyAt,
      aliveFor: timeInMillisec
    }
  }

  Message.create(message, (error, item) => responseHandler(res, error, item))
}))

module.exports = router