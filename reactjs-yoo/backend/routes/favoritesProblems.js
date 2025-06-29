const express = require('express');
const router = express.Router();
const FavoriteProblem = require('../models/FavoriteProblem');
const User = require('../models/User');

// POST /api/favorites/problem — Add or update a favorite
router.post('/problem', async (req, res) => {
  let { userId, problem } = req.body;

  if (!userId || !problem) {
    return res.status(400).json({ error: 'userId and problem required' });
  }

  // Auto-generate problem.id if missing
  if (!problem.id) {
    if (problem.platform === 'codeforces' && problem.contestId && problem.index) {
      problem.id = `cf-${problem.contestId}-${problem.index}`;
    } else if (problem.platform === 'leetcode' && problem.questionId) {
      problem.id = `lc-${problem.questionId}-${problem.titleSlug || ''}`;
    } else {
      return res.status(400).json({ error: 'problem.id missing and cannot be generated' });
    }
  }

  try {
    const updated = await FavoriteProblem.findOneAndUpdate(
      { userId, 'problem.id': problem.id },
      { userId, problem, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Optional: sync with User document
    try {
      await User.updateOne(
        { $or: [{ _id: userId }, { name: userId }] },
        { $addToSet: { favoriteProblems: updated._id } }
      );
    } catch (e) {
      // ignore if user not found
    }

    res.json({ message: 'Problem favorited/updated', favorite: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite problem', details: err.message });
  }
});

// DELETE /api/favorites/problem — Remove a favorite
router.delete('/problem', async (req, res) => {
  const { userId, problem } = req.body;

  if (!userId || !problem || !problem.id) {
    return res.status(400).json({ error: 'userId and problem.id required' });
  }

  try {
    const removed = await FavoriteProblem.findOneAndDelete({
      userId,
      'problem.id': problem.id
    });

    if (!removed) {
      return res.status(404).json({ error: 'Favorite problem not found' });
    }

    // Optional: remove reference from User
    await User.updateOne(
      { $or: [{ _id: userId }, { name: userId }] },
      { $pull: { favoriteProblems: removed._id } }
    );

    res.json({ message: 'Problem removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite', details: err.message });
  }
});

// (Optional) GET /api/favorites/problem?userId=... — Fetch favorites
router.get('/problem', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId required' });
  }

  try {
    const favorites = await FavoriteProblem.find({ userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites', details: err.message });
  }
});

module.exports = router;
