import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Place an order
app.post('/order', (req, res) => {
    const { basket_id, user_id, delivery_address } = req.body;
    const query = "INSERT INTO Orders (basket_id, user_id, delivery_address, order_status) VALUES (?, ?, ?, 'Pending')";

    db.query(query, [basket_id, user_id, delivery_address], (err, result) => {
        if (err) return res.status(500).send("Failed to place order");
        res.status(201).send({ message: "Order placed successfully", orderId: result.insertId });
    });
});

// Get all orders for a user
app.get('/orders/:userId', (req, res) => {
    const query = "SELECT * FROM Orders WHERE user_id = ?";
    
    db.query(query, [req.params.userId], (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve orders");
        res.json(results);
    });
});

// Get details of a specific order
app.get('/order/:orderId', (req, res) => {
    const query = `
        SELECT o.*, bi.quantity, p.product_name
        FROM Orders o
        JOIN Basket b ON o.basket_id = b.basket_id
        JOIN BasketItems bi ON b.basket_id = bi.basket_id
        JOIN Product p ON bi.product_id = p.product_id
        WHERE o.order_id = ?
    `;

    db.query(query, [req.params.orderId], (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve order details");
        if (results.length === 0) return res.status(404).send("Order not found");
        res.json(results);
    });
});

// Update order status (admin)
app.put('/order/:orderId', (req, res) => {
    const { order_status } = req.body; // New status should be passed in request body
    const query = "UPDATE Orders SET order_status = ? WHERE order_id = ?";

    db.query(query, [order_status, req.params.orderId], (err, result) => {
        if (err) return res.status(500).send("Failed to update order status");
        if (result.affectedRows === 0) return res.status(404).send("Order not found");
        res.send("Order status updated successfully");
    });
});

// Cancel an order
app.delete('/order/:orderId', (req, res) => {
    const query = "DELETE FROM Orders WHERE order_id = ?";

    db.query(query, [req.params.orderId], (err, result) => {
        if (err) return res.status(500).send("Failed to cancel order");
        if (result.affectedRows === 0) return res.status(404).send("Order not found");
        res.send("Order cancelled successfully");
    });
});


app.delete('/order/:orderId/cancel', (req, res) => {
    const { userId, isAdmin } = req.body; // Assume these are determined from the session or token
    let query = "DELETE FROM Orders WHERE order_id = ?";
    let queryParams = [req.params.orderId];

    // Admin-specific cancellation
    if (isAdmin) {
        query += " AND admin_id IS NULL OR admin_id = ?";
        queryParams.push(userId);
    } else {
        // Customer-specific cancellation
        query += " AND user_id = ? AND admin_id IS NULL";
        queryParams.push(userId);
    }

    db.query(query, queryParams, (err, result) => {
        if (err) return res.status(500).send("Failed to cancel order");
        if (result.affectedRows === 0) return res.status(404).send("Order not found or already cancelled by an admin");
        res.send("Order cancelled successfully");
    });
});
// Example: Update quantity of a basket item
app.put('/basketitem/:basketItemId', (req, res) => {
    const { quantity } = req.body;
    const query = "UPDATE BasketItems SET quantity = ? WHERE basket_id = ?";

    db.query(query, [quantity, req.params.basketItemId], (err, result) => {
        if (err) return res.status(500).send("Failed to update basket item");
        if (result.affectedRows === 0) return res.status(404).send("Basket item not found");
        res.send("Basket item updated successfully");
    });
});

//Return Products
app.post('/order/:orderId/return', (req, res) => {
    const userId = req.body.userId; // 
    const query = `
        UPDATE Orders 
        SET returned = TRUE 
        WHERE order_id = ? 
        AND user_id = ? 
        AND order_status = 'Delivered' 
        AND DATEDIFF(CURRENT_DATE, order_date) <= 30`; // 30-day return window

    db.query(query, [req.params.orderId, userId], (err, result) => {
        if (err) return res.status(500).send("Failed to process return");
        if (result.affectedRows === 0) return res.status(404).send("Order not found, not delivered, or beyond return window");
        res.send("Return processed successfully");
    });
});


//Query for Past Orders
app.get('/orders/:userId/history', (req, res) => {
    const { status, startDate, endDate, returned } = req.query;
    let query = `
        SELECT * FROM Orders 
        WHERE user_id = ?`;
    let queryParams = [req.params.userId];

    if (status) {
        query += " AND order_status = ?";
        queryParams.push(status);
    }
    if (returned) {
        query += " AND returned = ?";
        queryParams.push(returned === 'true');
    }
    if (startDate) {
        query += " AND order_date >= ?";
        queryParams.push(startDate);
    }
    if (endDate) {
        query += " AND order_date <= ?";
        queryParams.push(endDate);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) return res.status(500).send("Failed to retrieve order history");
        if (results.length === 0) return res.status(404).send("No orders found matching criteria");
        res.json(results);
    });
});

export default router;