// routes/signup.js
const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signup = express.Router();

const otps = {}; // Temporary OTPs storage

// Email Transporter Setup (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'inforaees808080@gmail.com',
    pass: 'wddu agli srmo pisj' // Your Gmail App password
  }
});

// POST /api/signup → Register + Send OTP
signup.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password required' });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with `verified: false`
    await User.create({ email, password: hashedPassword, verified: false });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[email] = otp;

    // Send OTP via email
    await transporter.sendMail({
      from: 'inforaees808080@gmail.com',
      to: email,
      subject: 'Email Verification - CodeWithRaees',
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, message: 'OTP sent to your email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/verify-otp → Verify OTP
signup.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ success: false, message: 'Email and OTP required' });

  if (otps[email] !== otp)
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

  try {
    // Update user verification status
    const user = await User.findOneAndUpdate({ email }, { verified: true });
    delete otps[email];  // Delete OTP after verification

    res.json({ success: true, message: 'Email verified successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

module.exports = signup;
