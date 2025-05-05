const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routers
const blogs = require('./router/blogs');
const login = require('./router/Login-route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://dbBlogs:Raees6908090@cluster0.dqzbkkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/blogs', blogs); // blog-related endpoints
app.use('/api', login);       // login route (e.g. POST /api/login)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
