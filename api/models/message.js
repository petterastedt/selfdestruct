const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
require("dotenv").config();

const schema = new mongoose.Schema(
  {
    isActive: Boolean,
    isFirstReq: Boolean,
    name: String,
    secret: String,
    textContent: String,
    url: String,
    timeLeft: Number,
    options: Object,
    timeOptions: Object,
  },
  { timestamps: true }
);

const poll = new mongoose.model("Message", schema);

module.exports = poll;
