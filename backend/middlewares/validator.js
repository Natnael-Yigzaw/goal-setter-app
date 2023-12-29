const { body, validationResult } = require("express-validator");

const createGoalValidation = [
  body("text").trim().notEmpty().withMessage("The text can not be empty"),
];

const registerUserValidation = [
  body("name").trim().exists().isString().withMessage("Name can not be empty"),
  body("email").trim().exists().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .exists()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character"),
];

const loginUserValidation = [
  body("email").trim().exists().isEmail().withMessage("Enter a valid email"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    return res.status(422).json({ message: errorMessage });
  }
  next();
};

module.exports = {
  createGoalValidation,
  registerUserValidation,
  loginUserValidation,
  validate,
};
