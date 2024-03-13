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