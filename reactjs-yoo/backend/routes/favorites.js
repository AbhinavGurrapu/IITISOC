const express = require('express');
const router = express.Router();

// POST /api/favorites/contest
router.post('/contest', async (req, res) => {
  const { userId, contest } = req.body;
  // TODO: Save `contest` to user's favorites in MongoDB
  // For now, just echo back
  res.json({ message: 'Contest favorited (mock)', userId, contest });
});

module.exports = router;
