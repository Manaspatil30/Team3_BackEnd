import express from 'express'

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

export default router;