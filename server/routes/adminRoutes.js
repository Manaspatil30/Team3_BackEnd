// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const db = require('../config/db'); // Import your database connection

// // Secret key for JWT
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');

// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the username already exists
//         const existingAdmin = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

//         if (existingAdmin.length > 0) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert the admin into the database
//         await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);

//         res.status(201).json({ message: 'Admin registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the admin exists
//         const admin = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

//         if (admin.length === 0) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Compare passwords
//         const passwordMatch = await bcrypt.compare(password, admin[0].password);

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ username: admin[0].username, isAdmin: true }, secretKey);

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;
