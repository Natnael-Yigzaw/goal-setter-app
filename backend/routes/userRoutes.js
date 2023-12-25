const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
  validate,
} = require("../middlewares/validator");

router.route("/").post(registerUserValidation, validate, registerUser);
router.route("/login").post(loginUserValidation, validate, loginUser);

module.exports = router;
