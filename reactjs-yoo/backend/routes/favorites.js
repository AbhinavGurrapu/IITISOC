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
    // Ensure userId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    userId = new mongoose.Types.ObjectId(userId);
    // Upsert: update if exists, otherwise insert
    const updated = await FavoriteContest.findOneAndUpdate(
      { userId, 'contest.id': contest.id },
      { userId, contest, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // Add to user's favoriteContests array if not already present
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $addToSet: { favoriteContests: updated._id } }
    );
    res.json({ message: 'Contest favorited/updated', favorite: updated, userUpdateResult });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite contest', details: err.message });
  }
});

module.exports = router;
