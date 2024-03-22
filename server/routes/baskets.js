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

  // Route to get user's basket
// router.get('/basket/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const selectQuery = `SELECT b.*, p.product_name, p.price
//                       FROM basketitems b
//                       JOIN product p ON b.product_id = p.product_id
//                       WHERE b.user_id = ${userId}`;
  
//   db.query(selectQuery, (err, result) => {
//       if (err) {
//           console.log(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           res.json(result);
//       }
//   });
// });

// // Route to add a product to the user's basket
// router.post('/basket/add', (req, res) => {
//   const { userId, productId, quantity } = req.body;
//   const insertQuery = `INSERT INTO basketitems (user_id, product_id, quantity) 
//                        VALUES (${userId}, ${productId}, ${quantity})`;
  
//   db.query(insertQuery, (err, result) => {
//       if (err) {
//           console.log(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           res.json({ message: 'Product added to the basket successfully' });
//       }
//   });
// });

// Route to add item to user's basket
router.post('/basket/add', (req, res) => {
    const {userId, productId, quantity} = req.body;
//   const userId = req.params.userId;
//   const productId = req.params.productId; // Assuming you get productId in the request body

  // Check if the item already exists in the basket
  const checkQuery = `SELECT * FROM basketitems WHERE user_id = ${userId} AND product_id = ${productId}`;

  db.query(checkQuery, (checkErr, checkResult) => {
      if (checkErr) {
          console.log(checkErr);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (checkResult.length > 0) {
              // If the item already exists, update the quantity or other details
              // For example, you can increment the quantity by 1
              const updateQuery = `UPDATE basketitems SET quantity = quantity + ${quantity} WHERE user_id = ${userId} AND product_id = ${productId}`;

              db.query(updateQuery, (updateErr, updateResult) => {
                  if (updateErr) {
                      console.log(updateErr);
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      res.json({ message: 'Item updated in the basket' });
                  }
              });
          } else {
              // If the item doesn't exist, insert a new entry
              const insertQuery = `INSERT INTO basketitems (user_id, product_id, quantity) VALUES (${userId}, ${productId}, ${quantity})`;

              db.query(insertQuery, (insertErr, insertResult) => {
                  if (insertErr) {
                      console.log(insertErr);
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      res.json({ message: 'Item added to the basket' });
                  }
              });
          }
      }
  });
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