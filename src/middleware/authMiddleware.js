const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { errorHandler } = require("../utils/errorHandler");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      token,
    });

    if (!user) {
      throw new Error("Couldn't find user");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    errorHandler(res, `Please authenticate. ${error?.message}`, 401);
  }
};
