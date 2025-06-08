const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String }, // Filename or URL
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Detection', detectionSchema);
