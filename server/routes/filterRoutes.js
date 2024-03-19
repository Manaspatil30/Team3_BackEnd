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

// filter product ratings by star
router.get('/products/rating', (req, res) => {
  const minRating = parseInt(req.query.minRating);

  if (isNaN(minRating) || minRating < 1 || minRating > 5) {
    return res.status(400).json({ error: 'Invalid rating value' });
  }

  const selectQuery = `
    SELECT p.*, AVG(pr.rating) AS average_rating
    FROM product p
    LEFT JOIN product_ratings pr ON p.product_id = pr.product_id
    GROUP BY p.product_id
    HAVING AVG(pr.rating) >= ?
  `;

  db.query(selectQuery, [minRating], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to fetch products by rating');
    }

    res.json(results);
  });
});

// router to find average rating 
router.get('/products/average-rating', (req, res) => {
  const selectQuery = `
    SELECT p.product_id, p.product_name, AVG(pr.rating) AS average_rating
    FROM product p
    LEFT JOIN product_ratings pr ON p.product_id = pr.product_id
    GROUP BY p.product_id, p.product_name
  `;

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to fetch average product ratings');
    }

    res.json(results);
  });
});

// Router to add a new rating
router.post('/products/rate', (req, res) => {
  const { productId, userId, rating } = req.body;
  // Router to add a new rating
router.post('/products/rate', (req, res) => {
  console.log('Received POST request to /api/products/rate');
  const { productId, userId, rating } = req.body;
  console.log('Request body:', req.body);
});

  
  const insertQuery = `
    INSERT INTO product_ratings (product_id, user_id, rating)
    VALUES (?, ?, ?);
  `;

  db.query(insertQuery, [productId, userId, rating], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to insert rating');
    }

    res.json({ success: true, message: 'Rating added successfully' });
  });
});

export default router;