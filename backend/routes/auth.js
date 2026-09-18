const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { generateToken, authMiddleware } = require('../middleware/auth');

const router = express.Router();

// In-memory user storage (replace with MongoDB in production)
const users = new Map();

/**
 * Register Route
 * POST /api/auth/register
 */
router.post('/register', 
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Check if user exists
      if (users.has(email)) {
        return res.status(409).json({
          success: false,
          message: 'User already exists'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = Date.now().toString();
      users.set(email, {
        userId,
        email,
        name,
        password: hashedPassword,
        createdAt: new Date()
      });

      // Generate JWT token
      const token = generateToken(userId, email);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: { userId, email, name }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/**
 * Login Route
 * POST /api/auth/login
 */
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = users.get(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken(user.userId, user.email);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { userId: user.userId, email: user.email, name: user.name }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/**
 * Verify Token Route
 * GET /api/auth/verify
 */
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
