const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createDetection } = require('../controllers/detectionController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createDetection);

module.exports = router;
