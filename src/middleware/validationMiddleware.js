const { validationResult } = require("express-validator");
const errorHandler = require("../utils/errorHandler");

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorHandler(res, errors.array()[0].msg, 400);
  } else {
    next();
  }
};
