const router = require("express").Router();

const {
  getRegisterPage,
  postRegister,
  getLoginPage,
  postLogin,
} = require("../controller/users.controller");

router.get("/register", getRegisterPage);
router.post("/register", postRegister);
router.get("/login", getLoginPage);
router.post("/login", postLogin);

module.exports = router;
