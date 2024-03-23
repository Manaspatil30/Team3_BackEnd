import express from 'express'
import db from '../config/db.js'

const router = express.Router();


// Route to get user's basket
router.get('/basket/:userId', (req, res) => {
  const userId = req.params.userId;

  // Fetch the basket items for the given user
  const query = `
    SELECT
      bi.basket_id,
      bi.product_id,
      p.product_name,
      bi.quantity,
      bi.price,
      (bi.quantity * bi.price) AS total_price
    FROM
      basketitems bi
    JOIN
      product p ON bi.product_id = p.product_id
    WHERE
      bi.user_id = ${userId}
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

// Route to add item to user's basket
router.post('/basket/add', (req, res) => {
  const { userId, productId, quantity, storeId } = req.body;

  // Check if the item already exists in the basket
  const checkQuery = `SELECT * FROM basketitems WHERE user_id = ${userId} AND product_id = ${productId}`;
  db.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch the product price from the storeproducts table
      const priceQuery = `SELECT price FROM storeproducts WHERE product_id = ${productId} AND store_id = ${storeId}`;
      db.query(priceQuery, (priceErr, priceResult) => {
        if (priceErr) {
          console.log(priceErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const productPrice = priceResult[0].price;
          if (checkResult.length > 0) {
            // If the item already exists, update the quantity and price
            const updateQuery = `UPDATE basketitems SET quantity = quantity + ${quantity}, price = ${productPrice * (checkResult[0].quantity + quantity)} WHERE user_id = ${userId} AND product_id = ${productId}`;
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
            const insertQuery = `INSERT INTO basketitems (user_id, product_id, quantity, price) VALUES (${userId}, ${productId}, ${quantity}, ${productPrice * quantity})`;
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
    }
  });
});


// Route to remove one or multiple items/quantities from basket
router.post('/basket/remove', (req, res) => {
  const { userId, productId, quantityToRemove } = req.body;

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

              if (currentQuantity > quantityToRemove) {
                  // Decrease the quantity by quantityToRemove
                  const newQuantity = currentQuantity - quantityToRemove;

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
                          res.json({ message: 'Basket updated successfully' });
                      }
                  });
              } else {
                  // Quantity to remove is greater than or equal to the current quantity, remove the entire entry
                  const deleteQuery = `
                      DELETE FROM basketitems
                      WHERE user_id = ? AND product_id = ?
                  `;

                  db.query(deleteQuery, [userId, productId], (err, result) => {
                      if (err) {
                          console.log(err);
                          res.status(500).json({ error: 'Internal Server Error' });
                      } else {
                          res.json({ message: 'Item removed from basket successfully' });
                      }
                  });
              }
          } else {
              // Product is not in the cart
              res.json({ message: 'Product not found in the basket' });
          }
      }
  });
});

  // Route to delete user's whole basket
router.delete('/basket/:userId', (req, res) => {
  const userId = req.params.userId;

  // Delete all items from the basket for the given user
  const deleteQuery = `DELETE FROM basketitems WHERE user_id = ${userId}`;
  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Basket deleted successfully' });
    }
  });
});
  export default router;