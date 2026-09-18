const express = require('express');
const axios = require('axios');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Python AI Service URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

/**
 * Get Habit Success Prediction
 * POST /api/predictions/success
 */
router.post('/success', authMiddleware, async (req, res) => {
  try {
    const { habitId, completedDays, streak, frequency } = req.body;

    if (!habitId) {
      return res.status(400).json({
        success: false,
        message: 'habitId is required'
      });
    }

    // Call Python AI Service
    const response = await axios.post(`${AI_SERVICE_URL}/api/predict/success`, {
      habitId,
      completedDays: completedDays || [],
      streak: streak || 0,
      frequency: frequency || 'daily'
    });

    res.json({
      success: true,
      prediction: response.data
    });
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting prediction from AI service'
    });
  }
});

/**
 * Get Optimal Reminder Time
 * POST /api/predictions/reminder-time
 */
router.post('/reminder-time', authMiddleware, async (req, res) => {
  try {
    const { habitId, completionTimes } = req.body;

    if (!habitId || !completionTimes) {
      return res.status(400).json({
        success: false,
        message: 'habitId and completionTimes are required'
      });
    }

    // Call Python AI Service
    const response = await axios.post(`${AI_SERVICE_URL}/api/predict/reminder-time`, {
      habitId,
      completionTimes
    });

    res.json({
      success: true,
      optimalTime: response.data
    });
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting reminder time prediction'
    });
  }
});

/**
 * Get Habit Recommendations
 * POST /api/predictions/recommendations
 */
router.post('/recommendations', authMiddleware, async (req, res) => {
  try {
    const { habits, goals } = req.body;

    if (!habits || habits.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'habits array is required'
      });
    }

    // Call Python AI Service
    const response = await axios.post(`${AI_SERVICE_URL}/api/predict/recommendations`, {
      habits,
      goals
    });

    res.json({
      success: true,
      recommendations: response.data
    });
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error getting recommendations'
    });
  }
});

/**
 * Analyze Habit Pattern
 * POST /api/predictions/pattern
 */
router.post('/pattern', authMiddleware, async (req, res) => {
  try {
    const { completedDays, frequency } = req.body;

    // Call Python AI Service
    const response = await axios.post(`${AI_SERVICE_URL}/api/predict/pattern`, {
      completedDays,
      frequency
    });

    res.json({
      success: true,
      pattern: response.data
    });
  } catch (error) {
    console.error('AI Service Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error analyzing habit pattern'
    });
  }
});

module.exports = router;
