// Compare prices of a specific product across different stores
app.get('/compare/products/:productId', (req, res) => {
    const query = `
        SELECT s.store_name, sp.price
        FROM StoreProducts sp
        JOIN Stores s ON sp.store_id = s.store_id
        WHERE sp.product_id = ?
        ORDER BY sp.price ASC
    `;
    db.query(query, [req.params.productId], (err, results) => {
        if (err) return res.status(500).send("Failed to compare product prices across stores");
        res.json(results);
    });
});

// Compare products and prices between selected stores
// Assuming request contains a body with storeIds as an array of store IDs to compare
app.get('/compare/stores', (req, res) => {
    const storeIds = req.query.storeIds.split(',').map(id => parseInt(id));
    const placeholders = storeIds.map(() => '?').join(',');
    const query = `
        SELECT p.product_name, sp.store_id, s.store_name, sp.price
        FROM StoreProducts sp
        JOIN Stores s ON sp.store_id = s.store_id
        JOIN Product p ON sp.product_id = p.product_id
        WHERE sp.store_id IN (${placeholders})
        ORDER BY p.product_name, sp.price ASC
    `;
    db.query(query, storeIds, (err, results) => {
        if (err) return res.status(500).send("Failed to compare products between stores");
        // Organize the results by product for better comparison
        const comparison = results.reduce((acc, curr) => {
            acc[curr.product_name] = acc[curr.product_name] || [];
            acc[curr.product_name].push({ storeName: curr.store_name, price: curr.price });
            return acc;
        }, {});
        res.json(comparison);
    });
});

export default router;