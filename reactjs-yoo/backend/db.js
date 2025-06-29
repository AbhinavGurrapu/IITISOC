const mongoose = require('mongoose');

const MONGO_URI = 'MONGODB_URI=mongodb+srv://mokshithmsd:ckHe1AGu9miXW6WS@cluster27.jrumcne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster27';

function connectDB() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = connectDB;
