import express from 'express'
import db from '../config/db.js'

const router = express.Router();

router.get('/products/category', (req, res) => {
  const categories = req.query.categories;

  if (!categories) {
    return res.status(400).json({ error: 'Invalid or missing category' });
  }

  const categoriesArray = categories.split(',').map(category => category.trim());

  if (categoriesArray.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing category parameters' });
  }

  const placeholders = categoriesArray.map(() => '?').join(',');
  const selectQuery = `SELECT * FROM Product WHERE category IN (${placeholders})`;

  db.query(selectQuery, categoriesArray, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to filter products by category');
    }
    res.json(results);
  });
});








router.get('/products/lowest-to-highest', (req, res) => {
    // Query the database to get products and their prices sorted by price
    const query = 'SELECT p.*, sp.price, sp.store_id FROM product p JOIN storeproducts sp ON p.product_id = sp.product_id ORDER BY sp.price ASC';
    db.query(query, (err, results) =>{
      if(err){
        console.log(err)
        return res.status(500).send("Failed to get products.");
      }
      res.json(results);
    });
});

// route to get highest to lowest
router.get('/products/highest-to-lowest', (req, res) => {
  // Query the database to get products and their prices sorted by price
  const query = 'SELECT p.*, sp.price, sp.store_id FROM product p JOIN storeproducts sp ON p.product_id = sp.product_id ORDER BY sp.price DESC';
  db.query(query, (err, results) =>{
    if(err){
      console.log(err)
      return res.status(500).send("Failed to get products.");
    }
    res.json(results);
  });
});


export default router;