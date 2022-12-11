const User = require("../models/users.model");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getRegisterPage = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../views/register.html"));
};

const postRegister = async (req, res) => {
  try {
    const { email } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.send("email alredy use");
      } else {
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });

          newUser.save();
          res.status(201).redirect("/login");
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLoginPage = (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/../views/login.html"));
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result === true) {
          await res.redirect("/");
        }
      });
    } else {
      res.send("<h3>User Not Valid</h3>");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getRegisterPage,
  postRegister,
  getLoginPage,
  postLogin,
};
