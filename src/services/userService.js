// services/userService.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
  try {
    const { username, password } = userData;
    const userExists = await getUserByUsername(username);

    if (userExists) {
      throw new Error("Username already existing");
    }
    const user = new User({ username, password });
    const newUser = await user.generateAuthToken();
    return { user: newUser };
  } catch (error) {
    throw new Error(`Error registering user. ${error?.message}`);
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error("Couldn't find user by username");
  }
};

const loginUser = async (userData) => {
  try {
    const { username, password } = userData;
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("Invalid username");
    }

    // Compare the provided password with the hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid username or password");
    }

    // Generate and send JWT token upon successful authentication
    const updatedUser = await user.generateAuthToken();
    return { user: updatedUser };
  } catch (error) {
    throw new Error(`Error logging in. ${error?.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
