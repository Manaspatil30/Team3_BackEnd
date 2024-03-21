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

router.post('/placeOrder', (req, res) => {
  // Extract data from the request body
  const { userId, basketId, deliveryAddress } = req.body;

  // Prepare SQL query to create a new order
  const insertOrderQuery = `
    INSERT INTO orders (user_id, basket_id, delivery_address, order_status)
    VALUES (?, ?, ?, 'Pending')
  `;

  // Execute the SQL query to create a new order
  db.query(insertOrderQuery, [userId, basketId, deliveryAddress], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ success: false, message: 'Error creating order' });
      return;
    }

    // Order created successfully
    const orderId = result.insertId;
    console.log(`Order ${orderId} created successfully`);
    res.json({ success: true, orderId, message: 'Order placed successfully' });
  });
});

// Route to remove an item from the cart
router.post('/cart/remove', (req, res) => {
  const { userId, productId } = req.body;

  // Query to get the current quantity of the product in the cart
  const getQuantityQuery = `
      SELECT quantity
      FROM basketitems
      WHERE user_id = ? AND product_id = ?
  `;

  db.query(getQuantityQuery, [userId, productId], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (result.length > 0) {
              const currentQuantity = result[0].quantity;

              if (currentQuantity > 1) {
                  // Decrement the quantity by 1
                  const newQuantity = currentQuantity - 1;

                  const updateQuery = `
                      UPDATE basketitems
                      SET quantity = ?
                      WHERE user_id = ? AND product_id = ?
                  `;

                  db.query(updateQuery, [newQuantity, userId, productId], (err, result) => {
                      if (err) {
                          console.log(err);
                          res.status(500).json({ error: 'Internal Server Error' });
                      } else {
                          res.json({ message: 'Cart updated successfully' });
                      }
                  });
              } else {
                  // Quantity is 1, remove the entire entry
                  const deleteQuery = `
                      DELETE FROM basketitems
                      WHERE user_id = ? AND product_id = ?
                  `;

                  db.query(deleteQuery, [userId, productId], (err, result) => {
                      if (err) {
                          console.log(err);
                          res.status(500).json({ error: 'Internal Server Error' });
                      } else {
                          res.json({ message: 'Item removed from cart successfully' });
                      }
                  });
              }
          } else {
              // Product is not in the cart
              res.json({ message: 'Product not found in the cart' });
          }
      }
  });
});

//   // Delete from basket
//   router.delete('/basket/:product_id', (req, res) => {
//     const productId = req.params.product_id;
  
//     db.query(
//       'DELETE FROM basketitems WHERE product_id = ?',
//       [productId],
//       (error, results) => {
//         if (error) throw error;
//         res.json({ message: 'Item removed from basket successfully' });
//       }
//     );
//   });

  export default router;