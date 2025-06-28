const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true },
    profilePicture: { type: String },
    // Store references to other collections
    favoriteContests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteContest' }],
    favoriteProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteProblem' }]
});

module.exports = mongoose.model('User', userSchema);
