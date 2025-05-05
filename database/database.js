const mongoose = require('mongoose');

// 📦 Connect to MongoDB
mongoose.connect('mongodb+srv://dbBlogs:Raees6908090@cluster0.dqzbkkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports=mongoose