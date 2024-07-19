// server/index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);
}

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:3000');
});
