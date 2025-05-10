const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

let alerts = []; // Store alerts in memory for now

app.post("/alert", upload.single("image"), (req, res) => {
  const { message } = req.body;
  const imageUrl = req.file ? `http://<YOUR_SERVER_IP>:8000/uploads/${req.file.filename}` : null;

  const alert = { id: Date.now(), message, imageUrl };
  alerts.push(alert);
  console.log("📲 Alert received:", alert);
  res.json({ success: true, alert });
});

app.get("/alerts", (req, res) => {
  res.json(alerts);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 Alert API running at http://localhost:${PORT}`));
