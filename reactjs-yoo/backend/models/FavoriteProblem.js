const mongoose = require('mongoose');

const FavoriteProblemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  problem: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FavoriteProblem', FavoriteProblemSchema);
