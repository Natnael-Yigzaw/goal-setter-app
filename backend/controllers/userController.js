const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ success: true, data: user });
});

const loginUser = asyncHandler(async (req, res) => {});

const getUser = asyncHandler(async (req, res) => {});

module.exports = { registerUser, loginUser, getUser };
