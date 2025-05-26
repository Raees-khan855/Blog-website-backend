const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  instructor: String,
  price: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
