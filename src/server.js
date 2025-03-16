const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
// Enable JSON parsing middleware with pretty formatting
app.use(express.json({ 
  indent: 2,
  spaces: 2
}));

const usersFilePath = path.join(__dirname, 'users.json');

// Calculate age from date of birth
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Add new user
app.post('/api/users', (req, res) => {
  try {
    const { username, password, dob, email } = req.body;
    
    // Read existing users
    let users = { users: [] };
    if (fs.existsSync(usersFilePath)) {
      const fileContent = fs.readFileSync(usersFilePath, 'utf8');
      users = JSON.parse(fileContent);
    }

    // Check if username already exists
    if (users.users.some(user => user.name === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Calculate age
    const age = calculateAge(dob);

    // Create new user object
    const newUser = {
      id: Date.now(),
      name: username,
      password,
      dob,
      age,
      email
    };

    // Add to users array
    users.users.push(newUser);

    // Write back to file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 