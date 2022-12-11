const mongoose = require("mongoose");

const userShcema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter Your username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter Your password"],
  },
  createOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userShcema);
