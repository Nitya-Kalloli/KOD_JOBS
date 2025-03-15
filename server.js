const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Read users
app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./src/users.json', 'utf8'));
  res.json(users);
});

// Add new user
app.post('/api/users', (req, res) => {
  const userData = req.body;
  const users = JSON.parse(fs.readFileSync('./src/users.json', 'utf8'));
  users.users.push(userData);
  fs.writeFileSync('./src/users.json', JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 