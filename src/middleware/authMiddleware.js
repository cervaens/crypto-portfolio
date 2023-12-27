const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      errorHandler(res, "User not found", 500);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    errorHandler(res, "Please authenticate.", 401);
  }
};
