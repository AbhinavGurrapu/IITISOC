const mongoose = require('mongoose');

const FavoriteContestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  contest: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FavoriteContest', FavoriteContestSchema);
