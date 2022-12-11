const express = require("express");
const cors = require("cors");

const app = express();
const User = require("./models/users.model");
require("./config/db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/./views/index.html");
});

app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/./views/register.html");
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/login", (req, res) => {
  res.status(200).sendFile(__dirname + "/./views/login.html");
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.status(200).redirect("/");
    } else {
      res.send("login not success");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use((req, res, next) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "somthing broke" });
  console.log(err);
});

module.exports = app;
