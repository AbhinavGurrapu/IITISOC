const express = require('express');
const router = express.Router();
const { getUpcomingContests } = require('../clistService');

router.get('/', async (req, res) => {
  try {
    const contests = await getUpcomingContests();
    res.json(contests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contests' });
  }
});

module.exports = router;
