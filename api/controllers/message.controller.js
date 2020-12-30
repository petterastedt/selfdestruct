const Message = require('./../models/message.js')
const helpers = require('./../helpers/time.js')

// const responseHandler = (res, error, item, errorMsg, successMsg, notFound) => {
//   const errorString = errorMsg ? errorMsg : "Database Error!"
//   const successString = successMsg ? successMsg : "Success!"
//   const notFoundString = notFound ? notFound : "Message not found!"

//   if (error) {
//     res.json({
//       message: errorString,
//       success: false
//     })
//   } else if (!item || item.length === 0 || !item.isActive) {
//     res.json({
//       message: notFoundString,
//       success: false
//     })
//   } else {
//     res.json({
//       item,
//       message: successString,
//       success: true
//     })
//   }
// }

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

// SET IS NOT FIRST REQUEST
const updateItem = async (secret, destroyAt, aliveFor) => {
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
}

module.exports = {
  deleteItem,
  setInactiveItem,
  updateItem,
  cleanupExpired
};