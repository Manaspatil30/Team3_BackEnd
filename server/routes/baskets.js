import express from 'express'
import db from '../config/db.js'

const router = express.Router();

//Get Basket
router.get('/basket/:user_id', (req, res) => {
    const userId = req.params.user_id;
  
    db.query(
      'SELECT basketitems.basket_id, product.product_name, product.description, product.product_id, basketitems.price, basketitems.quantity FROM basketitems JOIN product ON basketitems.product_id = product.product_id WHERE basketitems.user_id = ?',
      [userId],
      (error, results) => {
        if (error) throw error;
        res.json(results);
      }
    );
  });

// Post Basket
  router.post('/basket/:user_id', (req, res) => {
    const { product_id, price, quantity } = req.body;
    const userId = req.params.user_id;
  
    if (!product_id || !price || !quantity || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    db.query(
      'INSERT INTO basketitems (user_id, product_id, price, quantity) VALUES (?, ?, ?, ?)',
      [userId, product_id, price, quantity],
      (error, results) => {
        if (error) throw error;
        res.json({ basket_id: results.insertId, ...req.body });
      }
    );
  });

  // Delete from basket
  router.delete('/basket/:product_id', (req, res) => {
    const productId = req.params.product_id;
  
    db.query(
      'DELETE FROM basketitems WHERE product_id = ?',
      [productId],
      (error, results) => {
        if (error) throw error;
        res.json({ message: 'Item removed from basket successfully' });
      }
    );
  });

  export default router;