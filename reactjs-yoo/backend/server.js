require('dotenv').config();
const express = require('express');
const contestRoutes = require('./routes/contests');
const favoritesRoutes = require('./routes/favorites');
const favoritesProblemsRoutes = require('./routes/favoritesProblems');
const userRoutes = require('./routes/user');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');

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
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create user in MongoDB
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePicture: profile.photos[0]?.value
        });
        await newUser.save();
        return done(null, newUser);
    } catch (err) {
        return done(err, null);
    }
}));

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login
        // Redirect to frontend with user info as query params
        const user = req.user;
        const frontendUrl = `http://localhost:5173/?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}`;
        res.redirect(frontendUrl);
    }
);

app.use('/api/contests', contestRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/favorites', favoritesProblemsRoutes);
app.use('/api/user', userRoutes);

// Manual signup route
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, profilePicture } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Save user (for demo, password is stored as plain text; use hashing in production)
        const newUser = new User({
            name,
            email,
            profilePicture,
            // You can add password field to User model if needed
        });
        await newUser.save();
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Manual login route
app.post('/api/login', async (req, res) => {
    try {
        const { email } = req.body;
        // For demo, just find by email; add password check if you add password field
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No account found for this email. Please create an account before logging in.' });
        }
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by id with populated favorites
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('favoriteContests')
            .populate('favoriteProblems');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// List all users (for debugging)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Github authentication
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'Ov23liVXndKnnuHMKnjU',
    clientSecret: 'c6d7fc4f42754428a27e499a723c678696674708',
    callbackURL: 'http://localhost:3001/auth/github/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const existingUser = await User.findOne({ githubId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // Fallback for missing email
      let email = '';
      if (profile.emails && profile.emails.length > 0 && profile.emails[0].value) {
        email = profile.emails[0].value;
      } else if (profile.username) {
        email = `${profile.username}@github.com`;
      } else {
        email = `unknown_${profile.id}@github.com`;
      }
      const newUser = new User({
        name: profile.displayName || profile.username,
        email: email,
        githubId: profile.id,
        profilePicture: profile.photos && profile.photos[0] && profile.photos[0].value,
        bio: profile._json && profile._json.bio,
        location: profile._json && profile._json.location,
        blog: profile._json && profile._json.blog
      });
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }
));

app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/signin' }),
  async function(req, res) {
    // Fetch the user from DB to get the exact email stored
    const user = await User.findOne({ githubId: req.user.githubId });
    const name = user.name || user.username;
    const email = user.email || '';
    res.redirect(`http://localhost:5173/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
  }
);

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));