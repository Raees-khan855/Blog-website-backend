const express = require('express');
const blogs = express.Router();
const mongoose = require("mongoose");

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);


// GET all blogs -> GET /api/blogs
blogs.get('/', async (req, res) => {
  try {
    const blogsList = await Blog.find().sort({ createdAt: -1 });
    res.json(blogsList);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single blog -> GET /api/blogs/:id
blogs.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Create new blog
blogs.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to post blog." });
  }
});

module.exports = blogs;
