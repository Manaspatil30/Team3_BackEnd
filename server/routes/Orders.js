import express from 'express';
import db from '../config/db.js';

const router = express.Router();
router.post('/order/place', async (req, res) => {
  const { userId, basketId, orderStatus, deliveryAddress } = req.body;

  try {
    // Insert a new order
    const insertOrderQuery = `
      INSERT INTO orders (basket_id, user_id, order_status, delivery_address)
      VALUES (?, ?, ?, ?)
    `;
    const insertOrderResult = await db.query(insertOrderQuery, [basketId, userId, orderStatus, deliveryAddress]);
    const orderId = insertOrderResult.insertId;

    // Move basket items to order details
    const moveItemsQuery = `
      INSERT INTO orderdetails (order_id, store_product_id, product_id, quantity, price_at_purchase)
      SELECT ?, sp.store_product_id, bi.product_id, bi.quantity, sp.price
      FROM basketitems bi
      JOIN storeproducts sp ON bi.product_id = sp.product_id AND bi.store_id = sp.store_id
      WHERE bi.basket_id = ? AND bi.user_id = ? AND EXISTS (
        SELECT 1 FROM storeproducts sp2 WHERE sp2.store_product_id = sp.store_product_id
      );
    `;
    const moveItemsResult = await db.query(moveItemsQuery, [orderId, basketId, userId]);
    console.log("Move Items Result:", moveItemsResult);

    // Clear the user's basket after the order is placed
    const clearBasketQuery = `DELETE FROM basketitems WHERE basket_id = ? AND user_id = ?`;
    const clearBasketResult = await db.query(clearBasketQuery, [basketId, userId]);
    console.log("Clear Basket Result:", clearBasketResult);

    // Update the quantity in storeproducts table
    const updateQuantityQuery = `
  UPDATE storeproducts sp
  JOIN orderdetails od ON sp.store_product_id = od.store_product_id
  SET sp.quantity = sp.quantity - od.quantity
  WHERE od.order_id = ?
`;
const updateQuantityResult = await db.query(updateQuantityQuery, [orderId]); // Pass orderId as a value
console.log("Update Quantity Result:", updateQuantityResult);

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // Get all orders for a user
// router.get('/orders/:userId', async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const queryText = 'SELECT * FROM Orders WHERE user_id = ?';
//     const [results] = await db.query(queryText, [userId]);

//     res.json(results);
//   } catch (err) {
//     next(err);
//   }
// });


// // Get specific order
// router.get('/order/:orderId', async (req, res, next) => {
//   const { orderId } = req.params;

//   try {
//     const queryText = `
//       SELECT
//         o.*,
//         od.quantity,
//         p.product_name,
//         sp.price,
//         sp.description
//       FROM Orders o
//       JOIN OrderDetails od ON o.order_id = od.order_id
//       JOIN StoreProducts sp ON od.store_product_id = sp.store_product_id
//       JOIN Product p ON sp.product_id = p.product_id
//       WHERE o.order_id = ?
//     `;
//     const [results] = await db.query(queryText, [orderId]);

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json(results);
//   } catch (err) {
//     next(err);
//   }
// });

// // Update Order Status
// router.put('/order/:orderId/status', async (req, res, next) => {
//   const { order_status } = req.body;
//   const { orderId } = req.params;

//   try {
//     const queryText = 'UPDATE Orders SET order_status = ? WHERE order_id = ?';
//     const [result] = await db.query(queryText, [order_status, orderId]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json({ message: 'Order status updated successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// // Cancel order
// router.delete('/order/:orderId/cancel', async (req, res, next) => {
//   const { orderId } = req.params;

//   try {
//     await db.beginTransaction();

//     const deleteOrderQuery = 'DELETE FROM Orders WHERE order_id = ?';
//     const [deleteResult] = await db.query(deleteOrderQuery, [orderId]);

//     if (deleteResult.affectedRows === 0) {
//       await db.rollback();
//       return res.status(404).json({ error: 'Order not found or already canceled' });
//     }

//     const deleteOrderDetailsQuery = 'DELETE FROM OrderDetails WHERE order_id = ?';
//     await db.query(deleteOrderDetailsQuery, [orderId]);

//     await db.commit();

//     res.json({ message: 'Order canceled successfully' });
//   } catch (err) {
//     await db.rollback();
//     next(err);
//   }
// });

// // Return order
// router.post('/order/:orderId/return', async (req, res, next) => {
//   const { orderId } = req.params;

//   try {
//     const queryText = `
//       UPDATE Orders
//       SET returned = 1
//       WHERE order_id = ? AND returned = 0
//     `;
//     const [result] = await db.query(queryText, [orderId]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Order not found, not eligible for return, or already returned' });
//     }

//     res.json({ message: 'Order return processed successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// // Order history
// router.get('/orders/history/:userId', async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const queryText = 'SELECT * FROM Orders WHERE user_id = ?';
//     const [results] = await db.query(queryText, [userId]);

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'No orders found' });
//     }

//     res.json(results);
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
