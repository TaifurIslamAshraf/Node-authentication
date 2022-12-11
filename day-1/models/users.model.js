const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "plase enter your username"],
  },
  email: {
    type: String,
    required: [true, "plase enter your email"],
  },
  password: {
    type: String,
    required: [true, "plase enter your password"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userSchema);
