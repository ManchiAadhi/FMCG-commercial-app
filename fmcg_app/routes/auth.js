const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
/**
 * @swagger
 * path:
 *   /api/auth/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: mysecretpassword
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDMxODMyYjY3MmE5YjBhMDczNTIyMGYiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyOTI4OTIxOSwiZXhwIjoxNjI5Mjk5NDE5fQ.4ahd7FF7syHl6dItQplVGmNsH6R8pOJgUvEMoDEBBw8
 *       400:
 *         description: Bad request. Invalid username or password.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * path:
 *   /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: mysecretpassword
 *               role:
 *                 type: string
 *                 description: The role of the user.
 *                 example: user
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Invalid input data or username already exists.
 *       500:
 *         description: Internal server error.
 */