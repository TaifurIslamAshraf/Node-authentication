require("dotenv").config();
require("./config/database");
require("./config/passport");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/users.model");

const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "session",
    }),
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Home Route
app.get("/", (req, res) => {
  res.render("index", {});
});

//register : get
app.get("/register", (req, res) => {
  res.status(200).render("register", {});
});

//register: post
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User Alredy exists");
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser.save();
      res.status(201).redirect("/login");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
};

//login : get
app.get("/login", checkLoggedIn, (req, res) => {
  res.render("login", {});
});

//login : post
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

//Profile Protected route
app.get("/profile", checkAuthenticated, (req, res) => {
  res.render("profile");
});

//logout route
app.get("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//route error
app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

//server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "somthing broke",
    error: err.message,
  });
});

module.exports = app;
