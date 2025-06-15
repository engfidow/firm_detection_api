const Detection = require('../models/Detection');

exports.createDetection = async (req, res) => {
  try {
    const { label, message } = req.body;
    const image = req.file ? req.file.filename : null;

    const newDetection = new Detection({ label, message, image });
    await newDetection.save();

    res.status(201).json({
      message: 'Detection saved successfully',
      data: newDetection,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save detection', error: err.message });
  }
};


// 👇 NEW FUNCTION: Get All Detections
exports.getAllDetections = async (req, res) => {
  try {
    const detections = await Detection.find().sort({ timestamp: -1 });
    res.status(200).json({
      message: 'Detections fetched successfully',
      data: detections,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch detections', error: err.message });
  }
};