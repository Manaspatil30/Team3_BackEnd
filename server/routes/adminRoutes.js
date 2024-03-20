import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you're passing the user ID through JWT or session

  try {
    const selectQuery = 'SELECT status FROM userregistration WHERE user_id = ?';
    db.query(selectQuery, [userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (result.length > 0 && result[0].status === 'A') {
        next(); // User is an admin, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ error: 'Unauthorized' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Sales and Inventory Management Routes

// Get all products
router.get('/products', isAdmin, (req, res) => {
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
router.post('/products', isAdmin, (req, res) => {
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
router.put('/products/:id', isAdmin, (req, res) => {
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
router.delete('/products/:id', isAdmin, (req, res) => {
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