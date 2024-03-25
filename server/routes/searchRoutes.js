import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get('/products/search', (req, res) => {
    const { search } = req.query;
    const searchQuery = `
      SELECT p.*, sp.store_id, sp.price
      FROM product p
      JOIN storeproducts sp ON p.product_id = sp.product_id
      WHERE p.product_name LIKE ?
    `;
    db.query(searchQuery, [`%${search}%`], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to search for products");
      }
      res.json(results);
    });
  });

export default router;
