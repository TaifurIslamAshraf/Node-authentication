const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  username: {
    type: String,
    required: [true, "Plase Enter Your User Name"],
  },
  email: {
    type: String,
    required: [true, "Plase Enter Your Email"],
  },

  password: {
    type: String,
    required: [true, "Plase Enter Your password"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userSchema);
