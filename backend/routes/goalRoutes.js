const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { createGoalValidation, validate } = require("../middlewares/validator");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, getGoals)
  .post(protect, createGoalValidation, validate, createGoal);
router
  .route("/:id")
  .get(protect, getGoal)
  .delete(protect, deleteGoal)
  .put(protect, updateGoal);

module.exports = router;
