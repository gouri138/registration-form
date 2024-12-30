const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Read users from the users.json file
function readUsersFromFile() {
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        return JSON.parse(data); // Parse JSON data
    } catch (err) {
        return []; // If there's an error, return an empty array
    }
}

// Save users to the users.json file
function saveUsersToFile(users) {
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error saving users to file:', err);
    }
}

// API route to handle user registration
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword, address, dob } = req.body;

    // Validate inputs
    if (!username || !email || !password || !confirmPassword || !address || !dob) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    // Read existing users
    let users = readUsersFromFile();

    // Check if the username or email already exists
    if (users.some(user => user.username === username || user.email === email)) {
        return res.status(400).json({ error: 'Username or Email already exists!' });
    }

    // Create new user object
    const newUser = {
        username,
        email,
        password,
        address,
        dob
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array to the file
    saveUsersToFile(users);

    // Respond with success message
    res.status(200).json({ message: 'Registration successful!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
