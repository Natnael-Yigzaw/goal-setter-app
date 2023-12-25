const { body, validationResult } = require("express-validator");

const createValidation = [
  body("text")
    .trim()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("The text must contain atleast 10 characters"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    return res.status(422).json({ message: errorMessage });
  }
  next();
};

module.exports = { createValidation, validate };
