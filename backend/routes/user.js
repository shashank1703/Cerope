const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { User } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create user
        const newUser = await User.create({ username, email, password });

        res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser._id, username, email }
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // NOTE: if you hashed passwords, compare with bcrypt here
    if (user.password !== password) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Create JWT
    const token = require("jsonwebtoken").sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;