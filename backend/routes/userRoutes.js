const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
  validate,
} = require("../middlewares/validator");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(registerUserValidation, validate, registerUser);
router.route("/login").post(loginUserValidation, validate, loginUser);
router.route("/logout").get(protect, logoutUser);
router.route("/profile").get(protect, getProfile);

module.exports = router;
