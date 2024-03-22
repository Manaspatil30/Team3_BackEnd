import express from 'express';
import db from '../config/db.js'; // Adjust the import path as necessary

const router = express.Router();

// Advertisement route to get random products
router.get('/random-products', (req, res) => {
    const numberOfProducts = 5;

    const selectRandomProductsQuery = `
        SELECT * FROM Product
        ORDER BY RAND() 
        LIMIT ?
    `;

    db.query(selectRandomProductsQuery, [numberOfProducts], (err, results) => {
        if (err) {
            console.error('Failed to retrieve random products:', err);
            return res.status(500).send('Failed to retrieve random products');
        }
        res.json(results);
    });
});

export default router;
