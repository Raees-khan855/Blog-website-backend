// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const helmet = require('helmet');
app.use(helmet());


// MongoDB Connection
const mongoURI = 'mongodb+srv://dbBlogs:Raees6908090@cluster0.dqzbkkf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
const blogs = require('./router/blogs');
const signup = require('./router/signup');
const login = require('./router/login');
const search = require('./router/search')
// Use Routes
app.use('/api/blogs', blogs);
app.use('/api', signup);  // Signup routes
app.use('/api', login);    // Login routes
app.use('/api', search);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
