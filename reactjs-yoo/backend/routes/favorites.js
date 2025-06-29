// BACKEND - routes/favorites.js

const express = require('express');
const router = express.Router();
const FavoriteContest = require('../models/FavoriteContest');
const FavoriteProblem = require('../models/FavoriteProblem');
const User = require('../models/User');

// POST /api/favorites/contest
router.post('/contest', async (req, res) => {
  const { userId, contest } = req.body;
  if (!userId || !contest || !contest.id) {
    return res.status(400).json({ error: 'userId and contest with contest.id required' });
  }

  try {
    const updated = await FavoriteContest.findOneAndUpdate(
      { userId, 'contest.id': contest.id },
      { userId, contest, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await User.updateOne(
      { $or: [{ _id: userId }, { name: userId }] },
      { $addToSet: { favoriteContests: updated._id } }
    );

    res.json({ message: 'Contest favorited/updated', favorite: updated });
  } catch (err) {
    console.error('Error in POST /contest:', err);
    res.status(500).json({ error: 'Failed to save favorite contest', details: err.message });
  }
});

// DELETE /api/favorites/problem
router.delete('/problem', async (req, res) => {
  try {
    const { userId, problem } = req.body;
    if (!userId || !problem || !problem.id) {
      return res.status(400).json({ error: 'userId and problem.id are required' });
    }
    const removed = await FavoriteProblem.findOneAndDelete({
      userId,
      'problem.id': problem.id
    });
    if (!removed) {
      return res.status(404).json({ error: 'Favorite problem not found' });
    }

    // Return immediately after successful deletion
    return res.json({ message: 'Problem removed from favorites' });
    // (Optional) If you want to update the user, do it after the return above, or wrap in try/catch and ignore errors.
  } catch (err) {
    console.error("Error in DELETE /problem:", err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


// GET /api/favorites/contest?userId=...
router.get('/contest', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }
  try {
    const favorites = await FavoriteContest.find({ userId });
    res.json({ favorites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', details: err.message });
  }
});

// GET /api/favorites/all?userId=...
router.get('/all', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    const practiceProblems = await FavoriteProblem.find({ userId });
    const contestProblems = await FavoriteContest.find({ userId });
    res.json({ practiceProblems, contestProblems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', details: err.message });
  }
});

module.exports = router;
