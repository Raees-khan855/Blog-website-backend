const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path=require('path')

const app = express();
app.use(cors());
app.use(express.json()); // for handling JSON body

// 🔁 Create a pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Raees6908090',
  database: 'Blogs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use('/uploads', express.static('uploads'));
// 📦 Get all blogs
app.get('/api/blogs', (req, res) => {
  pool.query('SELECT * FROM blogs', (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// 📦 Get blog by ID
app.get('/api/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  pool.query('SELECT * FROM blogs WHERE id = ?', [blogId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ message: 'Blog not found' });
    res.send(result[0]);
  });
});

// 🚀 Start server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
