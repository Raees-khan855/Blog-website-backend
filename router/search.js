const express = require('express');
const search = express.Router();
const Blog = require('../models/blog');

// Escape regex to safely use user input in RegExp
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

// GET /api/search?query=yourSearchText
search.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ success: false, message: "Query parameter is required" });
  }

  try {
    const regex = new RegExp(escapeRegex(query), "i"); // case-insensitive match
    const blogs = await Blog.find({ title: regex }).limit(20);

    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = search;
