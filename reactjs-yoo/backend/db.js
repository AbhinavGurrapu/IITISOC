const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI;

function connectDB() {
  mongoose.connect(MONGO_URI);

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = connectDB;