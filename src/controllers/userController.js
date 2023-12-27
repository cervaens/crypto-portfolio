// controllers/userController.js
const { errorHandler } = require("../utils/errorHandler");
const userService = require("../services/userService");

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    errorHandler(res, error.message, 400);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    res.json(user);
  } catch (error) {
    errorHandler(res, error.message, 401);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
