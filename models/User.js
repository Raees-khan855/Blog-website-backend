// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

// Check if model already exists, and use it if it does
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
