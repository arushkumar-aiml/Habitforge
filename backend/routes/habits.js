const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// In-memory habits storage
const habitsDB = new Map();

/**
 * Create Habit
 * POST /api/habits
 */
router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, description, category, frequency, goal } = req.body;
    const userId = req.user.userId;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required'
      });
    }

    const habitId = Date.now().toString();
    const habit = {
      habitId,
      userId,
      name,
      description,
      category,
      frequency,
      goal,
      createdAt: new Date(),
      streak: 0,
      completedDays: []
    };

    if (!habitsDB.has(userId)) {
      habitsDB.set(userId, []);
    }
    habitsDB.get(userId).push(habit);

    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      habit
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Get All Habits for User
 * GET /api/habits
 */
router.get('/', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const habits = habitsDB.get(userId) || [];

    res.json({
      success: true,
      habits,
      total: habits.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Get Single Habit
 * GET /api/habits/:habitId
 */
router.get('/:habitId', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId } = req.params;

    const habits = habitsDB.get(userId) || [];
    const habit = habits.find(h => h.habitId === habitId);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    res.json({ success: true, habit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Update Habit
 * PUT /api/habits/:habitId
 */
router.put('/:habitId', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId } = req.params;

    const habits = habitsDB.get(userId) || [];
    const habitIndex = habits.findIndex(h => h.habitId === habitId);

    if (habitIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    habits[habitIndex] = { ...habits[habitIndex], ...req.body, habitId, userId };
    habitsDB.set(userId, habits);

    res.json({
      success: true,
      message: 'Habit updated successfully',
      habit: habits[habitIndex]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Mark Habit as Completed
 * POST /api/habits/:habitId/complete
 */
router.post('/:habitId/complete', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId } = req.params;

    const habits = habitsDB.get(userId) || [];
    const habit = habits.find(h => h.habitId === habitId);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    const today = new Date().toISOString().split('T')[0];
    if (!habit.completedDays.includes(today)) {
      habit.completedDays.push(today);
      habit.streak += 1;
    }

    res.json({
      success: true,
      message: 'Habit marked as completed',
      habit
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Delete Habit
 * DELETE /api/habits/:habitId
 */
router.delete('/:habitId', authMiddleware, (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId } = req.params;

    const habits = habitsDB.get(userId) || [];
    const filteredHabits = habits.filter(h => h.habitId !== habitId);

    if (habits.length === filteredHabits.length) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    habitsDB.set(userId, filteredHabits);

    res.json({
      success: true,
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
