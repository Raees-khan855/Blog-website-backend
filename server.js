const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

// ====== MIDDLEWARE SETUP ====== //

// Enable CORS for Netlify frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://raees-websites.netlify.app',
  'https://raees-khan855.github.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
}));

// Serve static files (e.g. uploaded images)
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false // ⚠️ Needed for allowing cross-origin resources
}));

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

// ====== MONGODB CONNECTION ====== //

const mongoURI = 'mongodb+srv://dbBlogs:Raees6908090@cluster0.dqzbkkf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ====== ROUTES ====== //

const blogs = require('./router/blogs');
const signup = require('./router/signup');
const login = require('./router/login');
const search = require('./router/search');
const course = require('./router/course');

app.use('/api/blogs', blogs);
app.use('/api', signup);
app.use('/api', login);
app.use('/api/course', course);
app.use('/api', search);

// ====== START SERVER ====== //

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
