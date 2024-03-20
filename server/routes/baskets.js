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

// // Route to add an item to the cart
// app.post('/cart/add', (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   // Query to check if the product already exists in the user's cart
//   const checkQuery = `
//       SELECT quantity
//       FROM basketitems
//       WHERE user_id = ? AND product_id = ?
//   `;

//   db.query(checkQuery, [userId, productId], (err, result) => {
//       if (err) {
//           console.log(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           if (result.length > 0) {
//               // Product exists in the cart, update the quantity
//               const existingQuantity = result[0].quantity;
//               const newQuantity = existingQuantity + quantity;

//               const updateQuery = `
//                   UPDATE basketitems
//                   SET quantity = ?
//                   WHERE user_id = ? AND product_id = ?
//               `;

//               db.query(updateQuery, [newQuantity, userId, productId], (err, result) => {
//                   if (err) {
//                       console.log(err);
//                       res.status(500).json({ error: 'Internal Server Error' });
//                   } else {
//                       res.json({ message: 'Cart updated successfully' });
//                   }
//               });
//           } else {
//               // Product doesn't exist in the cart, create a new entry
//               const insertQuery = `
//                   INSERT INTO basketitems (user_id, product_id, quantity)
//                   VALUES (?, ?, ?)
//               `;

//               db.query(insertQuery, [userId, productId, quantity], (err, result) => {
//                   if (err) {
//                       console.log(err);
//                       res.status(500).json({ error: 'Internal Server Error' });
//                   } else {
//                       res.json({ message: 'Item added to cart successfully' });
//                   }
//               });
//           }
//       }
//   });
// });

// // Route to remove an item from the cart
// app.post('/cart/remove', (req, res) => {
//   const { userId, productId } = req.body;

//   // Query to get the current quantity of the product in the cart
//   const getQuantityQuery = `
//       SELECT quantity
//       FROM basketitems
//       WHERE user_id = ? AND product_id = ?
//   `;

//   db.query(getQuantityQuery, [userId, productId], (err, result) => {
//       if (err) {
//           console.log(err);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           if (result.length > 0) {
//               const currentQuantity = result[0].quantity;

//               if (currentQuantity > 1) {
//                   // Decrement the quantity by 1
//                   const newQuantity = currentQuantity - 1;

//                   const updateQuery = `
//                       UPDATE basketitems
//                       SET quantity = ?
//                       WHERE user_id = ? AND product_id = ?
//                   `;

//                   db.query(updateQuery, [newQuantity, userId, productId], (err, result) => {
//                       if (err) {
//                           console.log(err);
//                           res.status(500).json({ error: 'Internal Server Error' });
//                       } else {
//                           res.json({ message: 'Cart updated successfully' });
//                       }
//                   });
//               } else {
//                   // Quantity is 1, remove the entire entry
//                   const deleteQuery = `
//                       DELETE FROM basketitems
//                       WHERE user_id = ? AND product_id = ?
//                   `;

//                   db.query(deleteQuery, [userId, productId], (err, result) => {
//                       if (err) {
//                           console.log(err);
//                           res.status(500).json({ error: 'Internal Server Error' });
//                       } else {
//                           res.json({ message: 'Item removed from cart successfully' });
//                       }
//                   });
//               }
//           } else {
//               // Product is not in the cart
//               res.json({ message: 'Product not found in the cart' });
//           }
//       }
//   });
// });

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