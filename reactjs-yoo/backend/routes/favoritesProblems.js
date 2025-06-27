const express = require('express');
const router = express.Router();

// POST /api/favorites/problem
router.post('/problem', async (req, res) => {
  const { userId, problem } = req.body;
  // TODO: Save `problem` to user's favorites in MongoDB
  res.json({ message: 'Problem favorited (mock)', userId, problem });
});

module.exports = router;
