const express = require('express');
const blogs = express.Router();
const mongoose = require("mongoose");
const path = require('path');

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Static path for uploads
blogs.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// POST new blog -> POST /api/blogs
blogs.post('/', async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const newBlog = new Blog({ title, content, image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Could not create blog' });
  }
});

module.exports = blogs;
