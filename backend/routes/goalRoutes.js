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

router
  .route("/")
  .get(getGoals)
  .post(createGoalValidation, validate, createGoal);
router.route("/:id").get(getGoal).delete(deleteGoal).put(updateGoal);

module.exports = router;
