require('dotenv').config();
const express = require('express');
const contestRoutes = require('./routes/contests');
const favoritesRoutes = require('./routes/favorites');
const favoritesProblemsRoutes = require('./routes/favoritesProblems');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/contests', contestRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/favorites', favoritesProblemsRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
