const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

/**
 * Get Habit Statistics
 * GET /api/analytics/stats
 */
router.get('/stats', authMiddleware, (req, res) => {
  try {
    // This would connect to database and calculate stats
    const stats = {
      totalHabits: 5,
      activeHabits: 3,
      completedToday: 2,
      averageStreak: 15,
      bestStreak: 45,
      successRate: 78.5
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Get Habit Progress Over Time
 * GET /api/analytics/progress
 */
router.get('/progress', authMiddleware, (req, res) => {
  try {
    const { habitId, days } = req.query;
    const daysCount = parseInt(days) || 30;

    // Sample progress data
    const progress = [];
    for (let i = 0; i < daysCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (daysCount - i));
      progress.push({
        date: date.toISOString().split('T')[0],
        completed: Math.random() > 0.3
      });
    }

    res.json({
      success: true,
      habitId,
      period: daysCount,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Get Habit Breakdown by Category
 * GET /api/analytics/category
 */
router.get('/category', authMiddleware, (req, res) => {
  try {
    const categoryStats = {
      Health: { total: 5, completed: 4, percentage: 80 },
      Productivity: { total: 3, completed: 2, percentage: 67 },
      Learning: { total: 2, completed: 1, percentage: 50 },
      Fitness: { total: 4, completed: 3, percentage: 75 }
    };

    res.json({
      success: true,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Get Weekly Summary
 * GET /api/analytics/weekly
 */
router.get('/weekly', authMiddleware, (req, res) => {
  try {
    const weeklySummary = {
      week: 'Sep 11 - Sep 17, 2024',
      totalHabits: 8,
      completionRate: 75,
      bestDay: 'Wednesday',
      worstDay: 'Sunday',
      habits: [
        { name: 'Morning Exercise', completions: 5 },
        { name: 'Reading', completions: 6 },
        { name: 'Meditation', completions: 4 },
        { name: 'Work Focus', completions: 7 }
      ]
    };

    res.json({
      success: true,
      weeklySummary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
