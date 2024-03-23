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
      (bi.quantity * bi.price) AS total_price,
      bi.store_id
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


// Route to add item to user's basket
router.post('/basket/add/:productId/:storeId', (req, res) => {
    const {productId, storeId} = req.params
  const { userId, quantity  } = req.body;

  // Check if the item already exists in the basket for the specific store
  const checkQuery = `SELECT * FROM basketitems WHERE user_id = ? AND product_id = ? AND store_id = ?`;
  const checkQueryValues = [userId, productId, storeId];

  db.query(checkQuery, checkQueryValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch the product price from the storeproducts table
      const priceQuery = `SELECT price FROM storeproducts WHERE product_id = ? AND store_id = ?`;
      const priceQueryValues = [productId, storeId];

      db.query(priceQuery, priceQueryValues, (priceErr, priceResult) => {
        if (priceErr) {
          console.log(priceErr);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const productPrice = priceResult[0].price;

          // Fetch the store details from the stores table
          const storeQuery = `SELECT * FROM stores WHERE store_id = ?`;
          const storeQueryValue = [storeId];

          db.query(storeQuery, storeQueryValue, (storeErr, storeResult) => {
            if (storeErr) {
              console.log(storeErr);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              const storeDetails = storeResult[0];

              if (checkResult.length > 0) {
                // If the item already exists for the specific store, update the quantity and price
                const updateQuery = `UPDATE basketitems SET quantity = quantity + ?, price = ? WHERE user_id = ? AND product_id = ? AND store_id = ?`;
                const updateQueryValues = [
                  quantity,
                  productPrice * (checkResult[0].quantity + quantity),
                  userId,
                  productId,
                  storeId,
                ];

                db.query(updateQuery, updateQueryValues, (updateErr, updateResult) => {
                  if (updateErr) {
                    console.log(updateErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                    res.json({ message: 'Item updated in the basket', storeDetails });
                  }
                });
              } else {
                // If the item doesn't exist for the specific store, insert a new entry
                const insertQuery = `INSERT INTO basketitems (user_id, product_id, quantity, price, store_id) VALUES (?, ?, ?, ?, ?)`;
                const insertQueryValues = [userId, productId, quantity, productPrice * quantity, storeId];

                db.query(insertQuery, insertQueryValues, (insertErr, insertResult) => {
                  if (insertErr) {
                    console.log(insertErr);
                    res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                    res.json({ message: 'Item added to the basket', storeDetails });
                  }
                });
              }
            }
          });
        }
      });
    }
  });
});

// Route to remove one or multiple items/quantities from basket
router.post('/basket/remove', (req, res) => {
  const { userId, productId, quantityToRemove, storeId } = req.body;

  // Query to get the current quantity of the product in the cart for the specific store
  const getQuantityQuery = `
    SELECT quantity
    FROM basketitems
    WHERE user_id = ? AND product_id = ? AND store_id = ?
  `;

  db.query(getQuantityQuery, [userId, productId, storeId], (err, result) => {
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
            WHERE user_id = ? AND product_id = ? AND store_id = ?
          `;
          db.query(updateQuery, [newQuantity, userId, productId, storeId], (err, result) => {
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
            WHERE user_id = ? AND product_id = ? AND store_id = ?
          `;
          db.query(deleteQuery, [userId, productId, storeId], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.json({ message: 'Item removed from basket successfully' });
            }
          });
        }
      } else {
        // Product is not in the cart for the specific store
        res.json({ message: 'Product not found in the basket for the specified store' });
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