import express from 'express';
import db from '../config/db.js';
//import {authMiddleware,secretkey} from './authentication.js'; // Import the authMiddleware function

const router = express.Router();

// Sales and Inventory Management Routes

// Get all products
router.get('/productss',  (req, res) => {
  const selectQuery = 'SELECT * FROM product';
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

// Add a new product
router.post('/products',  (req, res) => {
  const { product_name, description, category, quantity, best_before } = req.body;
  const insertQuery = 'INSERT INTO product (product_name, description, category, quantity, best_before) VALUES (?, ?, ?, ?, ?)';
  db.query(insertQuery, [product_name, description, category, quantity, best_before], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Product added successfully' });
    }
  });
});

// Update a product
router.put('/products/:id',(req, res) => {
  const productId = req.params.id;
  const { product_name, description, category, quantity, best_before } = req.body;
  const updateQuery = 'UPDATE product SET product_name = ?, description = ?, category = ?, quantity = ?, best_before = ? WHERE product_id = ?';
  db.query(updateQuery, [product_name, description, category, quantity, best_before, productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  });
});

// Delete a product
router.delete('/products/:id',  (req, res) => {
  const productId = req.params.id;
  const deleteQuery = 'DELETE FROM product WHERE product_id = ?';
  db.query(deleteQuery, [productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
});

// Add more routes for sales and inventory management as needed

export default router;
