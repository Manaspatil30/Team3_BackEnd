import express from 'express';
import db from '../config/db.js'; // Assuming this is your database connection module

const router = express.Router();

// Route to handle POST requests to "/contact-us"
router.post('/contact-us', (req, res) => {
    // Extracting name, email, and message from the request body
    const { name, email, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    // Prepare the SQL query
    const query = `
      INSERT INTO contact_us (name, email, message)
      VALUES (?, ?, ?);
    `;

    // Execute the query
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error saving your message. Please try again later.' });
        }
        // Success response
        res.status(200).json({ message: 'Your message has been sent successfully. Thank you for contacting us.' });
    });
});

router.get('/contact-admin', async (req, res) => {
    const query = 'SELECT * FROM contact_us;';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from contact_us table:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      // Send the fetched entries as a response
      res.json(results);
    });
  });
  

export default router;
