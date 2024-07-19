const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/api/applications', (req, res) => {
  fs.readFile('applications.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }

    const applications = JSON.parse(data);
    res.status(200).json(applications);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
