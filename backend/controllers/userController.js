const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });

      // Send registration email
      const text = `You are registered successfully`;
      await sendEmail({
        email: user.email,
        subject: "Successful Registration",
        text,
      });

      console.log(`Email sent successfully to: ${user.email}`);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out Successfully." });
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, logoutUser, getProfile };
