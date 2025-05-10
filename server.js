const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  },
});

const upload = multer({ storage });

// In-memory alert storage
let alerts = [];

// POST /alert - Save alert and image
app.post("/alert", upload.single("image"), (req, res) => {
  const { message } = req.body;

  if (!req.file || !message) {
    return res.status(400).json({ success: false, error: "Image and message are required." });
  }

  const imageUrl = `https://${req.hostname}/uploads/${req.file.filename}`;
  const alert = {
    id: Date.now(),
    message,
    imageUrl,
  };

  alerts.push(alert);
  console.log("📲 New Alert:", alert);

  res.status(200).json({ success: true, alert });
});

// GET /alerts - Return all alerts
app.get("/alerts", (req, res) => {
  res.json(alerts);
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ Farm Detection API is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
