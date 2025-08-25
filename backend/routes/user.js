const { Router } = require("express");
const authMiddleware = require("../middleware/user");
const { User } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Update user profile
const updateUserProfile = async (req, res) => {
  console.log('User ID from token:', req.userId); // Check if auth middleware is working
  console.log('Received profile data:', req.body);   // Check if frontend is sending data
  
  try {
    const userId = req.userId;
    const updatedData = req.body;
    
    // Update user profile with form data and set profileSetupCompleted to true
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        ...updatedData, 
        profileSetupCompleted: true 
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated successfully:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Profile Routes
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/me', authMiddleware, getUserProfile);

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

        // Hash password before saving
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with hashed password
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });

        // Generate token for auto-login
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return user data with token for auto-login
        res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser._id, username, email },
            token
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
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Use bcrypt to compare passwords
    const bcrypt = require('bcryptjs');
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Create JWT
    const token = require("jsonwebtoken").sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, username: user.username, email, profileSetupCompleted: user.profileSetupCompleted } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;