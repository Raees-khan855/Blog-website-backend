const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

// CORS Config (Only once)
app.use(cors({
  origin: 'https://raees-khan855.github.io',
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
const search = require('./router/search');

// Use Routes
app.use('/api/blogs', blogs);
app.use('/api', signup);
app.use('/api', login);
app.use('/api', search);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
