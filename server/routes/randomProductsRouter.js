import express from 'express';
import db from '../config/db.js'; // Ensure this path is correct based on your project structure

const router = express.Router();

// Route to get 3 random products for advertisements
router.get('/random-products', async (req, res) => {
    const numberOfProducts = 3; // Changed from 5 to 3

    const selectRandomProductsQuery = `
        SELECT * FROM product
        ORDER BY RAND() 
        LIMIT ?
    `;

    try {
        const [results] = await db.query(selectRandomProductsQuery, [numberOfProducts]);
        res.json(results);
    } catch (err) {
        console.error('Failed to retrieve random products:', err);
        res.status(500).send('Failed to retrieve random products');
    }
});

export default router;
