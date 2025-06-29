const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Make email optional and sparse
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  profilePicture: { type: String },
  bio: { type: String },
  location: { type: String },
  blog: { type: String },
  favoriteContests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
  favoriteProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
});

module.exports = mongoose.model('User', userSchema);

