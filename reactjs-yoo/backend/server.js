require('dotenv').config();
const express = require('express');
const contestRoutes = require('./routes/contests');
const favoritesRoutes = require('./routes/favorites');
const favoritesProblemsRoutes = require('./routes/favoritesProblems');
const cors = require('cors');
const connectDB = require('./db');

// Google Auth dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Session middleware for OAuth
app.use(session({ secret: process.env.SESSION_SECRET || 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serialize/deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // You can store user in DB here
    return done(null, profile);
}));

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login
        res.redirect('http://localhost:5173'); // Change to your frontend home page URL if different
    }
);

app.use('/api/contests', contestRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/favorites', favoritesProblemsRoutes);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
