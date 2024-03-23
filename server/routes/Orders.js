import express from 'express';
import db from '../config/db.js';

const ordersRouter = express.Router();

// Place an order
ordersRouter.post('/order', async (req, res, next) => {
  const { basket_id, user_id, delivery_address } = req.body;

  try {
    await db.beginTransaction();

    const queryText = 'INSERT INTO Orders (basket_id, user_id, delivery_address, order_status) VALUES (?, ?, ?, \'Pending\')';
    const [result] = await db.query(queryText, [basket_id, user_id, delivery_address]);

    const orderId = result.insertId;

    // Insert order details
    const basketItemsQuery = 'SELECT product_id, price, quantity FROM BasketItems WHERE basket_id = ?';
    const [basketItems] = await db.query(basketItemsQuery, [basket_id]);

    for (const item of basketItems) {
      const orderDetailQuery = 'INSERT INTO OrderDetails (order_id, store_product_id, quantity, price_at_purchase) VALUES (?, (SELECT store_product_id FROM StoreProducts WHERE product_id = ?), ?, ?)';
      await db.query(orderDetailQuery, [orderId, item.product_id, item.quantity, item.price]);
    }

    await db.commit();

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    await db.rollback();
    next(err);
  }
});


// Get all orders for a user
ordersRouter.get('/orders/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const queryText = 'SELECT * FROM Orders WHERE user_id = ?';
    const [results] = await db.query(queryText, [userId]);

    res.json(results);
  } catch (err) {
    next(err);
  }
});


// Get specific order
ordersRouter.get('/order/:orderId', async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const queryText = `
      SELECT
        o.*,
        od.quantity,
        p.product_name,
        sp.price,
        sp.description
      FROM Orders o
      JOIN OrderDetails od ON o.order_id = od.order_id
      JOIN StoreProducts sp ON od.store_product_id = sp.store_product_id
      JOIN Product p ON sp.product_id = p.product_id
      WHERE o.order_id = ?
    `;
    const [results] = await db.query(queryText, [orderId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Update Order Status
ordersRouter.put('/order/:orderId/status', async (req, res, next) => {
  const { order_status } = req.body;
  const { orderId } = req.params;

  try {
    const queryText = 'UPDATE Orders SET order_status = ? WHERE order_id = ?';
    const [result] = await db.query(queryText, [order_status, orderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    next(err);
  }
});

// Cancel order
ordersRouter.delete('/order/:orderId/cancel', async (req, res, next) => {
  const { orderId } = req.params;

  try {
    await db.beginTransaction();

    const deleteOrderQuery = 'DELETE FROM Orders WHERE order_id = ?';
    const [deleteResult] = await db.query(deleteOrderQuery, [orderId]);

    if (deleteResult.affectedRows === 0) {
      await db.rollback();
      return res.status(404).json({ error: 'Order not found or already canceled' });
    }

    const deleteOrderDetailsQuery = 'DELETE FROM OrderDetails WHERE order_id = ?';
    await db.query(deleteOrderDetailsQuery, [orderId]);

    await db.commit();

    res.json({ message: 'Order canceled successfully' });
  } catch (err) {
    await db.rollback();
    next(err);
  }
});

// Return order
ordersRouter.post('/order/:orderId/return', async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const queryText = `
      UPDATE Orders
      SET returned = 1
      WHERE order_id = ? AND returned = 0
    `;
    const [result] = await db.query(queryText, [orderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found, not eligible for return, or already returned' });
    }

    res.json({ message: 'Order return processed successfully' });
  } catch (err) {
    next(err);
  }
});

// Order history
ordersRouter.get('/orders/history/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const queryText = 'SELECT * FROM Orders WHERE user_id = ?';
    const [results] = await db.query(queryText, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
});

export default ordersRouter;
