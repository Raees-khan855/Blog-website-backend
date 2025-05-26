const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use("/upload", express.static(path.join(__dirname, "upload")));

// CORS Middleware
app.use(cors({
  origin: 'https://raees-websites.netlify.app/', // Replace with your Netlify domain
  credentials: true,
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helmet for security headers
app.use(helmet());

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

// MongoDB Connection
const mongoURI = 'mongodb+srv://dbBlogs:Raees6908090@cluster0.dqzbkkf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
const blogs = require('./router/blogs');
const signup = require('./router/signup');
const login = require('./router/login');
const search = require('./router/search');
const course = require("./router/course");

// Use Routes
app.use('/api/blogs', blogs);
app.use('/api', signup);
app.use('/api', login);
app.use('/api/course', course);
app.use('/api', search);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
