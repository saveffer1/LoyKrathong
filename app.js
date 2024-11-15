const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Path to JSON file
const dataFile = path.join(__dirname, 'data.json');

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Form submission
app.post('/submit', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send('Name and message are required!');
  }

  const entry = { name, message };
  let data = [];

  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile));
  }

  data.push(entry);

  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.redirect('/display');
});

// Display floating messages
app.get('/display', (req, res) => {
  const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
  res.render('display', { data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
