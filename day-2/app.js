const express = require("express");
const cors = require("cors");
const router = require("./routes/usersAut.route");

const app = express();
require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//login-register
app.use(router);

//route error
app.use((req, res, next) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

//server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "somthing broke",
  });
});

module.exports = app;
