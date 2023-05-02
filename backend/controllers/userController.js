const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register new user
// @route POST /users/register
// @access Public
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Confirm data
    if (!username || !password)
      return res.status(400).send({ msg: "All fields are required." });

    // Check for duplicate username
    const duplicate = await userModel.findOne({ username });

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 3); // salt rounds

    // Create and store new user
    const user = await userModel.create({ username, password: hashedPwd });

    if (user) {
      //created
      res.send({ msg: `Account created successfully.` });
    } else {
      res.status(400).send({ msg: "Invalid user data received" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Login user
// @route POST /users/login
// @access Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Confirm data
    if (!username || !password)
      return res.status(400).send({ msg: "All fields are required." });

    // Getting user
    const user = await userModel.findOne({ username });
    if (!user) return res.status(400).send({ msg: "User not found." });

    // Comparing password
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ msg: `Login successful.`, token });
    } else {
      res.status(400).send({ msg: "Wrong credentials." });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", error });
  }
};

module.exports = { registerUser, loginUser };
