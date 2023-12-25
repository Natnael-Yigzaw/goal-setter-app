const asyncHandler = require("express-async-handler");
const Goal = require("../models/Goal");

const createGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.create({ ...req.body });
  res.status(201).json({ success: true, data: goal });
});

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ success: true, data: goals });
});

const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  res.status(200).json({ success: true, data: goal });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, data: goal });
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, data: [] });
});

module.exports = {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
};
