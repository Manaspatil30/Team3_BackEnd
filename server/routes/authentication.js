import express from 'express'
import crypto from 'crypto'
import db from '../config/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

/* Sign up and sign in*/

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
        db.query(insertQuery, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Sign In Route


const secretKey = crypto.randomBytes(32).toString('hex');

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const selectQuery = "SELECT * FROM userregistration WHERE email = ?";
        db.query(selectQuery, [email], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(401).json({ error: 'Authentication failed. User not found.' });
            }
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
            }
            const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token: token, userId : user.user_id, fName : user.first_name, lName : user.last_name });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;