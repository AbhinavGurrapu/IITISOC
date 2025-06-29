const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user with populated favorites
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('favoriteContests')
            .populate('favoriteProblems');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add favorite contest (ensures uniqueness)
router.post('/:id/favorite-contests', async (req, res) => {
    try {
        const { contestId } = req.body;
        await User.updateOne(
            { _id: req.params.id },
            { $addToSet: { favoriteContests: contestId } }
        );
        res.json({ message: 'Favorite contest added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add favorite problem (ensures uniqueness)
router.post('/:id/favorite-problems', async (req, res) => {
    try {
        const { problemId } = req.body;
        await User.updateOne(
            { _id: req.params.id },
            { $addToSet: { favoriteProblems: problemId } }
        );
        res.json({ message: 'Favorite problem added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
