const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register new user
// @route POST /users/register
// @access Public
const registerUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    // Confirm data
    if (!username || !password || !name)
      return res.status(400).send({ msg: "All fields are required." });

    // Check for duplicate username
    const duplicate = await User.findOne({ username });

    if (duplicate) {
      return res
        .status(409)
        .json({ msg: "Username already exits, please login." });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 3); // salt rounds

    // Create and store new user
    const user = await User.create({ name, username, password: hashedPwd });

    if (user) {
      //created
      res.send({ msg: `Account created successfully.` });
    } else {
      res.status(400).send({ msg: "Invalid user data received" });
    }
  } catch (error) {
    console.log(error);
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
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ msg: "User not found." });

    // Comparing password
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({
        userId: user._id,
        name: user.name,
        username: username,
        token,
      });
    } else {
      res.status(400).send({ msg: "Wrong credentials." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

module.exports = { registerUser, loginUser };
