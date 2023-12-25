const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { createValidation, validate } = require("../middlewares/validator");

router.route("/").get(getGoals).post(createValidation, validate, createGoal);
router.route("/:id").get(getGoal).delete(deleteGoal).put(updateGoal);

module.exports = router;
