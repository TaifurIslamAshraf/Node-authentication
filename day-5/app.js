const express = require("express");
const app = express();

//EJS
app.set("view engine", "ejs");

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routers
app.use("/", require("./routers/index"));

//Router error
app.use("*", (req, res, next) => {
  res.status(404).render("error.ejs");
});

//server error
app.use((err, req, res, next) => {
  res.status(500).send({
    message: "somthing broke",
    statusCode: 500,
  });
  console.log(err.message);
});

module.exports = app;
