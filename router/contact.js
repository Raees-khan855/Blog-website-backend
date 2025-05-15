const express = require('express');
const nodemailer = require('nodemailer');
const contact = express.Router();

contact.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'inforaees808080@gmail.com',
      pass: 'wddu agli srmo pisj', // Use App Password here
    },
  });

  const mailOptions = {
    from: email,
    to: 'inforaees808080@gmail.com',
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

module.exports = contact;