import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get('/products/search', (req, res) => {
    const { search } = req.query; 
    const searchQuery = "SELECT * FROM Product WHERE product_name LIKE ?";
    db.query(searchQuery, [`%${search}%`], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to search for products");
        }
        res.json(results);
    });
});

export default router;
