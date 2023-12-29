const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");
const User = require("../models/User");

const createGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json({ success: true, data: goal });
});

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ success: true, data: goals });
});

const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  res.status(200).json({ success: true, data: goal });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, data: updatedGoal });
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, data: [] });
});

module.exports = {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
};
