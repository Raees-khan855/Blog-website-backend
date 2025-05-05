// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env in local dev

// Import Routers
const blogs = require('./router/blogs');
const login = require('./router/Login-route');

const app = express();

// Middleware
app.use(cors({
  origin: "https://your-username.github.io", // Replace with your GitHub Pages URL
}));
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection (Updated)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/blogs', blogs);
app.use('/api', login);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
