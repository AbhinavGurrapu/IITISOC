const express = require('express');
const router = express.Router();
const FavoriteContest = require('../models/FavoriteContest');

// POST /api/favorites/contest
router.post('/contest', async (req, res) => {
  const { userId, contest } = req.body;
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
    res.json({ message: 'Contest favorited/updated', favorite: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite contest', details: err.message });
  }
});

module.exports = router;
