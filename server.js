const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const detectionRoutes = require('./routes/detection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/alert', detectionRoutes); // Use /alert route

// MongoDB connect
mongoose.connect('mongodb+srv://root:root@cluster0.kbsy1uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error('❌ MongoDB connection error:', err));
