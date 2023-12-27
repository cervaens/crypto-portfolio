// models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },
});

// Hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Generate JWT token for authentication
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  user.token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return user.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
