const express = require("express");
const course = express.Router();
const Course = require("../models/Course");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// ✅ GET all courses
course.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ POST: Add new course
course.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const image = req.file ? `/upload/${req.file.filename}` : "";

    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      image,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });

  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = course;
