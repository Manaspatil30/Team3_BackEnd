import express from 'express';
import db from '../config/db.js'; // Assuming db.js is properly configured for your database

const router = express.Router();

// Route to get products with stock below 10
router.get('/low-stock', (req, res) => {
  // Adjusted query to fetch products with stock below 10, matching provided database schema
  const query = `
    SELECT p.product_name, sp.quantity, s.store_name
    FROM storeproducts sp
    JOIN product p ON sp.product_id = p.product_id
    JOIN stores s ON sp.store_id = s.store_id
    WHERE sp.quantity < 10;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching low stock products' });
    }

    // Adjust response parsing according to your DB client's structure
    // Assuming results directly contain rows
    res.json(results);
  });
});

export default router;
