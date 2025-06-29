const axios = require('axios');
const express = require('express');
const router = express.Router();

// Proxy for LeetCode daily challenge (to avoid CORS)
router.get('/leetcode/daily', async (req, res) => {
  try {
    // LeetCode daily challenge endpoint (may change, this is a common one)
    const response = await axios.get('https://leetcode.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      params: req.query, // Pass through any query params
      data: req.body, // Pass through any body if needed
    });
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json({ error: err.response.data });
    } else {
      res.status(500).json({ error: 'Failed to fetch LeetCode daily challenge.' });
    }
  }
});

module.exports = router;
