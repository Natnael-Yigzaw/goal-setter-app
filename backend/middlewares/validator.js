const { body, validationResult } = require("express-validator");

const createGoalValidation = [
  body("text")
    .trim()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("The text must contain atleast 10 characters"),
];

const registerUserValidation = [
  body("name")
    .trim()
    .exists()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Name must be atleast 5 character"),
  body("email").trim().exists().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .exists()
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 character"),
];

const loginUserValidation = [
  body("email").trim().exists().isEmail().withMessage("Enter a valid email"),
  // body("password")
  //   .trim()
  //   .exists()
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be atleast 8 character"),
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
