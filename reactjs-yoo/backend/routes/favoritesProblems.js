const express = require('express');
const router = express.Router();
const FavoriteProblem = require('../models/FavoriteProblem');
const User = require('../models/User');
const mongoose = require('mongoose');

// POST /api/favorites/problem
router.post('/problem', async (req, res) => {
  let { userId, problem } = req.body;
  if (!userId || !problem) {
    return res.status(400).json({ error: 'userId and problem required' });
  }
  // Auto-generate problem.id if missing
  if (!problem.id) {
    if (problem.platform && problem.contestId && problem.index) {
      problem.id = `${problem.platform}-${problem.contestId}-${problem.index}`;
    } else {
      return res.status(400).json({ error: 'problem.id missing and cannot be generated (need platform, contestId, index)' });
    }
  }
  try {
    // Ensure userId is a valid ObjectId string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    userId = new mongoose.Types.ObjectId(userId);
    // Upsert: update if exists, otherwise insert
    const updated = await FavoriteProblem.findOneAndUpdate(
      { userId, 'problem.id': problem.id },
      { userId, problem, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // Add to user's favoriteProblems array if not already present
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $addToSet: { favoriteProblems: updated._id } }
    );
    res.json({ message: 'Problem favorited/updated', favorite: updated, userUpdateResult });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite problem', details: err.message });
  }
});

module.exports = router;
