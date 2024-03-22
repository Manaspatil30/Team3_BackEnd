import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Route to get product and store information
router.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
  
    // Query to get product information
    const productQuery = `
      SELECT p.product_id, p.product_name, p.description, p.category, p.quantity
      FROM product p
      WHERE p.product_id = ?
    `;
  
    // Query to get store information for the product
    const storeQuery = `
      SELECT sp.product_id, sp.price, s.store_name
      FROM storeproducts sp
      JOIN stores s ON sp.store_id = s.store_id
      WHERE sp.product_id = ?
    `;
  
    // Execute the product query first
    db.query(productQuery, [productId], (err, productResult) => {
      if (err) throw err;
  
      // If the product is found, execute the store query
      if (productResult.length > 0) {
        db.query(storeQuery, [productId], (err, storeResult) => {
          if (err) throw err;
  
          const product = productResult[0];
          const stores = storeResult;
  
          // Prepare the response object
          const response = {
            productId: product.product_id,
            productName: product.product_name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            stores: stores.map(store => ({
              price: store.price,
              storeName: store.store_name
            }))
          };
  
          res.json(response);
        });
      } else {
        // If the product is not found, return an appropriate response
        res.status(404).json({ error: 'Product not found' });
      }
    });
  });

// router.get('/price-comparison/:productId', (req, res) => {
//   const productId = req.params.productId;

//   // Query to fetch prices and product details from storeproducts and products tables
//   const selectQuery = `
//     SELECT
//       p.product_id,
//       p.product_name,
//       p.description,
//       p.category,
//       sp.price,
//       sp.quantity,
//       s.store_name
//     FROM
//       storeproducts sp
//     JOIN
//       product p ON sp.product_id = p.product_id
//     JOIN
//       stores s ON sp.store_id = s.store_id
//     WHERE
//       sp.product_id = ?;
//   `;

//   db.query(selectQuery, [productId], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(result);
//     }
//   });
// });

export default router;
