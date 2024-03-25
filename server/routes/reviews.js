import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Add or update a review for a product
router.post('/product/review/:productId', (req, res) => {
    const { user_id, rating, review_text } = req.body;
    const product_id = req.params.productId;
    const findQuery = "SELECT * FROM product_ratings WHERE product_id = ? AND user_id = ?";
    const insertQuery = "INSERT INTO product_ratings (product_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)";
    const updateQuery = "UPDATE product_ratings SET rating = ?, review_text = ? WHERE product_id = ? AND user_id = ?";

    db.query(findQuery, [product_id, user_id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to process request");
        }

        if (results.length > 0) {
            // Review exists, update it
            db.query(updateQuery, [rating, review_text, product_id, user_id], (err, result) => {
                if (err) return res.status(500).send("Failed to update review");
                res.status(200).send({ message: "Review updated successfully" });
            });
        } else {
            // Review does not exist, insert it
            db.query(insertQuery, [product_id, user_id, rating, review_text], (err, result) => {
                if (err) return res.status(500).send("Failed to add review");
                res.status(201).send({ message: "Review added successfully", reviewId: result.insertId });
            });
        }
    });
});

// Get all reviews for a product
router.get('/product/reviews/:productId', (req, res) => {
    const query = "SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC";

    db.query(query, [req.params.productId], (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve reviews");
        res.json(results);
    });
});

// Get average rating for a product
router.get('/product/:productId/average-rating', (req, res) => {
    const query = "SELECT AVG(rating) AS averageRating FROM product_reviews WHERE product_id = ?";

    db.query(query, [req.params.productId], (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve average rating");
        res.json({ averageRating: results[0].averageRating || 0 });
    });
});

// Get reviews for a product filtered by rating
router.get('/product/:productId/reviews/:stars', (req, res) => {
    const query = "SELECT * FROM product_reviews WHERE product_id = ? AND rating = ? ORDER BY created_at DESC";

    db.query(query, [req.params.productId, req.params.stars], (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve reviews");
        res.json(results);
    });
});

export default router;
