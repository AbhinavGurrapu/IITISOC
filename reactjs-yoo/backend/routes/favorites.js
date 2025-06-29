const express = require('express');
const router = express.Router();
const FavoriteContest = require('../models/FavoriteContest');
const User = require('../models/User');
const mongoose = require('mongoose');

// POST /api/favorites/contest
router.post('/contest', async (req, res) => {
  let { userId, contest } = req.body;
  if (!userId || !contest || !contest.id) {
    return res.status(400).json({ error: 'userId and contest with contest.id required' });
  }
  try {
    // Upsert: update if exists, otherwise insert
    const updated = await FavoriteContest.findOneAndUpdate(
      { userId, 'contest.id': contest.id },
      { userId, contest, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // Add to user's favoriteContests array if not already present (optional, only if user exists)
    try {
      await User.updateOne(
        { $or: [{ _id: userId }, { name: userId }] },
        { $addToSet: { favoriteContests: updated._id } }
      );
    } catch (e) { /* ignore if user not found */ }
    res.json({ message: 'Contest favorited/updated', favorite: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite contest', details: err.message });
  }
});

// DELETE /api/favorites/contest
router.delete('/contest', async (req, res) => {
  const { userId, contest } = req.body;
  if (!userId || !contest || !contest.id) {
    return res.status(400).json({ error: 'userId and contest.id required' });
  }
  try {
    const removed = await FavoriteContest.findOneAndDelete({
      userId,
      'contest.id': contest.id
    });
    if (!removed) {
      return res.status(404).json({ error: 'Favorite contest not found' });
    }
    // Remove reference from User (optional)
    await User.updateOne(
      { $or: [{ _id: userId }, { name: userId }] },
      { $pull: { favoriteContests: removed._id } }
    );
    res.json({ message: 'Contest removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite', details: err.message });
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

module.exports = router;
