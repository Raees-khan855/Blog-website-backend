const express = require('express');
const search = express.Router();
const Blog = require('../models/blog');

// Escape regex to handle special characters in user input
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

// Search route (place this FIRST!)
search.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ success: false, message: "Query parameter is required" });
  }

  try {
    const regex = new RegExp(escapeRegex(query), "i");
    const blogs = await Blog.find({ title: regex }).limit(20);
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get blog by ID (must come AFTER /search)
search.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = search;
