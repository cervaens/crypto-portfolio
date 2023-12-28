const { body, validationResult } = require("express-validator");
const { errorHandler } = require("../utils/errorHandler");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorHandler(res, errors.array()[0].msg, 400);
  } else {
    next();
  }
};

const validateBuyTransaction = [
  body("buyCryptoCurrencySymbol")
    .notEmpty()
    .withMessage("Buy cryptocurrency symbol is required"),
  body("buyQuantity").notEmpty().withMessage("Buy quantity is required"),
  body("sellCryptoCurrencySymbol")
    .notEmpty()
    .withMessage("Sell cryptocurrency symbol is required"),
  validateRequest,
];

module.exports = { validateRequest, validateBuyTransaction };
