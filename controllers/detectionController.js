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
