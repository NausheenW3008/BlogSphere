const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for users
const users = [];

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to the in-memory array
        users.push({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user.' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = users.find((user) => user.email === email);

        // Check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in.' });
    }
});

// Start the Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});