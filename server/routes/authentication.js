import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();
const secretKey = crypto.randomBytes(32).toString('hex');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization; // Extract the token from the 'Authorization' header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify and decode the token
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Helper function to retrieve user details from the database
const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM userregistration WHERE user_id = ?';
        db.query(selectQuery, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length === 0) {
                    reject(new Error('User not found'));
                } else {
                    resolve(result[0]);
                }
            }
        });
    });
};

router.get('/', (req, res) => {
    const selectQuery = "SELECT * from userregistration"
    db.query(selectQuery, (err, result) => {
        if (err) { console.log(err) };
        res.send(result)
    })
})

router.get('/users', (req, res) => {
    const selectQuery = 'SELECT * FROM userregistration;';
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result);
        }
    });
});

router.get('/user/:id', authMiddleware, (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.user.userId; // Assuming userId is stored in the token payload
    console.log(tokenUserId)
    console.log(userId)
    if (userId != tokenUserId) {
        return res.status(403).json({ error: 'You are not authorized to update this user' });
    }

    const selectQuery = "SELECT * FROM userregistration WHERE user_id = ?";
    db.query(selectQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

router.post('/user/add', async (req, res) => {
    const { first_name, last_name, phone_number, email, address, MembershipTypeID, password } = req.body;

    try {
        // Check if the email already exists
        const emailExistsQuery = "SELECT COUNT(*) AS count FROM userregistration WHERE email = ?";
        db.query(emailExistsQuery, [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            const emailCount = result[0].count;

            // If the email exists, return an error
            if (emailCount > 0) {
                return res.status(400).send("Email already exists");
            }

            // If the email does not exist, proceed to add the user
            // Generate a salt to use for hashing
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the salt
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertQuery = "INSERT INTO userregistration (first_name, last_name, phone_number, email, address, MembershipTypeID, password,status) VALUES (?, ?, ?, ?, ?, ?, ?,'C')";
            db.query(insertQuery, [first_name, last_name, phone_number, email, address, MembershipTypeID, hashedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Failed to add user");
                } else {
                    res.status(201).send("User added successfully");
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to add user");
    }
});

router.post('/user/addAdmin', async (req, res) => {
    const { first_name, last_name, phone_number, email, address, MembershipTypeID, password } = req.body;

    try {
        // Check if the email already exists
        const emailExistsQuery = "SELECT COUNT(*) AS count FROM userregistration WHERE email = ?";
        db.query(emailExistsQuery, [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            const emailCount = result[0].count;

            // If the email exists, return an error
            if (emailCount > 0) {
                return res.status(400).send("Email already exists");
            }

            // If the email does not exist, proceed to add the user
            // Generate a salt to use for hashing
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the salt
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertQuery = "INSERT INTO userregistration (first_name, last_name, phone_number, email, address, MembershipTypeID, password,status) VALUES (?, ?, ?, ?, ?, ?, ?,'A')";
            db.query(insertQuery, [first_name, last_name, phone_number, email, address, MembershipTypeID, hashedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Failed to add user");
                } else {
                    res.status(201).send("User added successfully");
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to add user");
    }
});

router.put('/user/update/:id', authMiddleware, async (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.user.userId; // Assuming userId is stored in the token payload

    // Check if the user ID from the token matches the user ID from the request parameters
    if (userId != tokenUserId) {
        return res.status(403).json({ error: 'You are not authorized to access this user' });
    }

    const { first_name, last_name, phone_number, email, address, membership, start_date, end_date } = req.body;

    try {
        const updateQuery = `
            UPDATE userregistration
            SET first_name=?, last_name=?, phone_number=?, email=?, address=?, MembershipTypeID=?, start_date=?, end_date=?
            WHERE user_id=?
        `;
        db.query(updateQuery, [first_name, last_name, phone_number, email, address, membership, start_date, end_date, userId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Failed to update user information");
            } else {
                res.status(200).send("User information updated successfully");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to update user information");
    }
});

router.delete('/user/delete/:id', authMiddleware, (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.user.userId; // Assuming userId is stored in the token payload

    // Check if the user ID from the token matches the user ID from the request parameters
    if (userId != tokenUserId) {
        return res.status(403).json({ error: 'You are not authorized to access this user' });
    }

    const deleteQuery = "DELETE FROM userregistration WHERE user_id=?";
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to delete user");
        } else {
            res.status(200).send("User deleted successfully");
        }
    });
});

router.post('/user/signin', (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const findUserQuery = 'SELECT * FROM userregistration WHERE email = ?';
        db.query(findUserQuery, [email], async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error');
                return;
            }

            if (result.length === 0) {
                res.status(401).send('Invalid email or password');
                return;
            }

            const user = result[0];
            console.log(user);
            // Compare the provided password with the stored hashed password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(401).send('Invalid email or password');
                return;
            }

            const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, { expiresIn: '24h' });
            res.status(200).json({ token: token, userId: user.user_id, fName: user.first_name, lName: user.last_name, status: user.status });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

router.put('/user/change-password/:id', authMiddleware, async (req, res) => {
    const userId = req.params.id;
    const tokenUserId = req.user.userId; // Assuming userId is stored in the token payload

    // Check if the user ID from the token matches the user ID from the request parameters
    if (userId != tokenUserId) {
        return res.status(403).json({ error: 'You are not authorized to access this user' });
    }

    const { oldPassword, newPassword } = req.body;

    try {
        // Check if oldPassword matches the current password in the database
        const user = await getUserById(userId);
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid old password' });
        }

        // Generate a salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        const updateQuery = `
            UPDATE userregistration 
            SET password=?
            WHERE user_id=?
        `;
        db.query(updateQuery, [hashedPassword, userId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Failed to update password");
            } else {
                res.status(200).send("Password updated successfully");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to update password");
    }
});

export default router;