import express from 'express'
import db from '../config/db.js'

const router = express.Router();

router.get('/products/category/:category', (req, res) => {
    const { category } = req.params;
    const selectQuery = "SELECT * FROM Product WHERE category = ?";
    db.query(selectQuery, [category], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to filter products by category");
        }
        res.json(results);
    });
});



// route to filter products lowest to highest 
router.get('/products/lowest-to-highest', async (req, res) => {
  try {
    // Query the database to get products and their prices sorted by price
    const query = 'SELECT p.*, sp.price FROM product p JOIN storeproducts sp ON p.product_id = sp.product_id ORDER BY sp.price ASC';
    const result = await db.query(query);

    // Send the sorted products with prices as a response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to filter products highest to lowest
router.get('/products/highest-to-lowest', async (req, res) => {
  try {
    // Query the database to get products and their prices sorted by price in descending order
    const query = 'SELECT p.*, sp.price FROM product p JOIN storeproducts sp ON p.product_id = sp.product_id ORDER BY sp.price DESC';
    const result = await db.query(query);

    // Send the sorted products with prices as a response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;