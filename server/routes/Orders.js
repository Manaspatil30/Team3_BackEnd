import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// // Route to create a new order
// router.post('/orders/create', (req, res) => {
//     // Extract data from request body
//     const { basketId, userId, orderStatus, deliveryAddress, orderItems } = req.body;

//     // Insert new order into the database
//     const insertOrderQuery = `
//         INSERT INTO orders (basket_id, user_id, order_status, delivery_address)
//         VALUES (?, ?, ?, ?)
//     `;
//     db.query(insertOrderQuery, [basketId, userId, orderStatus, deliveryAddress], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             const orderId = result.insertId;
            
//             // Iterate through orderItems to update product quantities
//             orderItems.forEach(item => {
//                 const { storeProductId, quantity } = item;
//                 // Update quantity in storeproducts table
//                 const updateQuantityQuery = `
//                     UPDATE storeproducts
//                     SET quantity = quantity - ?
//                     WHERE store_product_id = ?
//                 `;
//                 db.query(updateQuantityQuery, [quantity, storeProductId], (errUpdate, resultUpdate) => {
//                     if (errUpdate) {
//                         console.error(errUpdate);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                     }
//                 });
//             });

//             res.status(201).json({ message: 'Order placed successfully', orderId });
//         }
//     });
// });





router.post('/orders/createe', (req, res) => {
  // Extract data from request body
  const { basketId, userId, orderStatus, deliveryAddress, orderItems } = req.body;

  // Insert new order into the database
  const insertOrderQuery = `
      INSERT INTO orders (basket_id, user_id, order_status, delivery_address)
      VALUES (?, ?, ?, ?)
  `;
  db.query(insertOrderQuery, [basketId, userId, orderStatus, deliveryAddress], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          const orderId = result.insertId;

          // Delete the user's basket
          const deleteBasketQuery = `
              DELETE FROM basket WHERE basket_id = ?
          `;
          db.query(deleteBasketQuery, [basketId], (errDeleteBasket, resultDeleteBasket) => {
              if (errDeleteBasket) {
                  console.error(errDeleteBasket);
                  res.status(500).json({ error: 'Internal Server Error' });
              } else {
                  // Insert order details into the database
                  orderItems.forEach(item => {
                      const { storeProductId, quantity, storeId } = item;

                      // Fetch the price from storeproducts table
                      const getPriceQuery = `
                          SELECT price FROM storeproducts WHERE product_id = ? AND store_id = ?
                      `;
                      db.query(getPriceQuery, [storeProductId, storeId], (errGetPrice, resultGetPrice) => {
                          if (errGetPrice) {
                              console.error(errGetPrice);
                              res.status(500).json({ error: 'Internal Server Error' });
                          } else {
                              if (resultGetPrice.length === 0) {
                                  // No product found for the given storeProductId and storeId
                                  console.error('Product not found for storeProductId:', storeProductId, 'and storeId:', storeId);
                                  // Optionally send a response or log the error
                                  return;
                              }

                              const priceAtPurchase = resultGetPrice[0].price;

                              const insertOrderDetailQuery = `
                                  INSERT INTO orderdetails (order_id, store_product_id, quantity, store_id, price_at_purchase)
                                  VALUES (?, ?, ?, ?, ?)
                              `;
                              db.query(insertOrderDetailQuery, [orderId, storeProductId, quantity, storeId, priceAtPurchase], (errInsertDetail, resultInsertDetail) => {
                                  if (errInsertDetail) {
                                      console.error(errInsertDetail);
                                      res.status(500).json({ error: 'Internal Server Error' });
                                      return;
                                  }

                                  // Update product quantity in storeproducts table
                                  const updateQuantityQuery = `
                                      UPDATE storeproducts
                                      SET quantity = quantity - ?
                                      WHERE product_id = ? AND store_id = ?
                                  `;
                                  db.query(updateQuantityQuery, [quantity, storeProductId, storeId], (errUpdate, resultUpdate) => {
                                      if (errUpdate) {
                                          console.error(errUpdate);
                                          res.status(500).json({ error: 'Internal Server Error' });
                                          return;
                                      }
                                  });
                              });
                          }
                      });
                  });

                  res.status(201).json({ message: 'Order placed successfully', orderId });
              }
          });
      }
  });
});





// Fetch all orders
router.get('/orders', (req, res) => {
  const selectAllOrdersQuery = `SELECT * FROM orders`;
  db.query(selectAllOrdersQuery, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
  });
});




// Assuming your user table has an identifier like `user_id` and is linked to the orders table

// Route to get orders by a specific user
router.get('/orders/by-user/:userId', (req, res) => {
  const { userId } = req.params;

  // Revised SQL query that reflects the new database structure
  const query = `
    SELECT o.order_id, o.order_date, o.order_status, 
           od.order_detail_id, od.quantity, od.price_at_purchase,
           sp.store_id, s.store_name, -- Include store information
           p.product_id, p.product_name
    FROM orders o
    JOIN orderdetails od ON o.order_id = od.order_id
    JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
    JOIN product p ON sp.product_id = p.product_id
    LEFT JOIN stores s ON sp.store_id = s.store_id -- Optional: if you want the store name
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC, od.order_detail_id ASC
  `;

  // Execute the query
  db.query(query, [userId], (err, ordersDetails) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Format the response
    const formattedOrders = ordersDetails.reduce((acc, detail) => {
      if (!acc[detail.order_id]) {
        acc[detail.order_id] = {
          orderId: detail.order_id,
          orderDate: detail.order_date,
          status: detail.order_status,
          storeId: detail.store_id, // Store information added
          storeName: detail.store_name, // Store name added (if you included the store in the query)
          orderDetails: []
        };
      }
      acc[detail.order_id].orderDetails.push({
        detailId: detail.order_detail_id,
        productId: detail.product_id,
        productName: detail.product_name,
        quantity: detail.quantity,
        priceAtPurchase: detail.price_at_purchase
        // Note: store information is linked at the order level in this format
        // If each item could potentially come from a different store,
        // you might want to include storeId and storeName here instead.
      });
      return acc;
    }, {});

    res.json(Object.values(formattedOrders));
  });
});


// Update an order
router.put('/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { basketId, userId, orderStatus, deliveryAddress, returned, adminId } = req.body;
  const updateOrderQuery = `
      UPDATE orders SET basket_id = ?, user_id = ?, order_status = ?, delivery_address = ?, returned = ?, admin_id = ?
      WHERE order_id = ?
  `;
  db.query(updateOrderQuery, [basketId, userId, orderStatus, deliveryAddress, returned, adminId, orderId], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order updated successfully' });
  });
});

// Delete an order
router.delete('/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const deleteOrderQuery = `DELETE FROM orders WHERE order_id = ?`;
  db.query(deleteOrderQuery, [orderId], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
  });
});

// order returns
router.post('/orders/return', (req, res) => {
  // Extract data from request body
  const { orderId } = req.body;

  // Validate the order ID and fetch order details
  const getOrderQuery = `SELECT * FROM orders WHERE order_id = ?`;

  db.query(getOrderQuery, [orderId], (err, orderResults) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (orderResults.length === 0) {
          return res.status(404).json({ error: 'Order not found' });
      }

      // Update the order status to 'Returned'
      const updateOrderStatusQuery = `UPDATE orders SET order_status = 'Returned', returned = 1 WHERE order_id = ?`;

      db.query(updateOrderStatusQuery, [orderId], (errUpdateStatus, resultUpdateStatus) => {
          if (errUpdateStatus) {
              console.error(errUpdateStatus);
              return res.status(500).json({ error: 'Internal Server Error on updating order status' });
          }

          // Fetch order items details
          const getOrderItemsQuery = `SELECT * FROM orderdetails WHERE order_id = ?`;

          db.query(getOrderItemsQuery, [orderId], (errGetItems, orderItems) => {
              if (errGetItems) {
                  console.error(errGetItems);
                  return res.status(500).json({ error: 'Internal Server Error on fetching order items' });
              }

              orderItems.forEach(item => {
                  const { store_product_id, quantity, store_id } = item;

                  // Update product quantity in storeproducts table for each store_id
                  const updateProductQuantityQuery = `
                      UPDATE storeproducts
                      SET quantity = quantity + ?
                      WHERE store_product_id = ? AND store_id = ?
                  `;

                  db.query(updateProductQuantityQuery, [quantity, store_product_id, store_id], (errUpdateQuantity, resultUpdateQuantity) => {
                      if (errUpdateQuantity) {
                          console.error(errUpdateQuantity);
                          // Consider how to handle partial failures in a real app
                          return res.status(500).json({ error: 'Internal Server Error on updating product quantity' });
                      }
                  });
              });

              res.status(200).json({ message: 'Order return processed successfully' });
          });
      });
  });
});




export default router;

