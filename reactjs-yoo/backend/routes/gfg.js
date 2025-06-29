const express = require('express');
const axios = require('axios');
const router = express.Router();

// Proxy for GFG Problem of the Day
router.get('/potd', async (req, res) => {
  try {
    const response = await axios.get('https://gfg-problem-of-the-day-api.vercel.app/api/potd');
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

module.exports = router;
