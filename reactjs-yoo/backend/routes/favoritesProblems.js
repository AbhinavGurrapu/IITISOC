const express = require('express');
const router = express.Router();
const FavoriteProblem = require('../models/FavoriteProblem');

// POST /api/favorites/problem
router.post('/problem', async (req, res) => {
  const { userId, problem } = req.body;
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
    // Upsert: update if exists, otherwise insert
    const updated = await FavoriteProblem.findOneAndUpdate(
      { userId, 'problem.id': problem.id },
      { userId, problem, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ message: 'Problem favorited/updated', favorite: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite problem', details: err.message });
  }
});

module.exports = router;
