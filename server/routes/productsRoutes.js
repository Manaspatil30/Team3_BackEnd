import express from "express";
import db from "../config/db.js";

const router = express.Router();

//Admin

router.post('/product/add', (req, res) => {
    const { product_name, description, category, quantity, store_id, price } = req.body;

    // Insert into Product table
    const insertProductQuery = "INSERT INTO product (product_name, description, category) VALUES (?, ?, ?)";
    db.query(insertProductQuery, [product_name, description, category], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to add product");
        }

        console.log(result) 
        const productId = result.insertId;

        // Insert into StoreProducts table
        const insertStoreProductQuery = "INSERT INTO storeproducts ( product_id, store_id, price, quantity) VALUES (?, ?, ?, ?)";
        db.query(insertStoreProductQuery, [productId, store_id, price, quantity], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to add product to store");
            }

            res.status(201).send({ message: "Product added successfully", productId });
        });
    });
});


//update products

router.put('/product/update/:id', (req, res) => {
    const productId = req.params.id;
    const { product_name, description, category, quantity, best_before } = req.body;
    const updateQuery = "UPDATE product SET product_name = ?, description = ?, category = ?, quantity = ?, best_before = ? WHERE product_id = ?";
    db.query(updateQuery, [product_name, description, category, quantity, best_before, productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to update product");
        }
        res.status(200).send("Product updated successfully");
    });
});

//List Products
router.get('/products', (req, res) => {
    const selectQuery = "SELECT p.*, sp.price, sp.store_id FROM product p JOIN storeproducts sp ON p.product_id = sp.product_id";
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to retrieve products");
        }
        res.json(results);
    });
});

//Delete Product

router.delete('/product/delete/:id', (req, res) => {
    const productId = req.params.id;
    const deleteQuery = "DELETE FROM product WHERE product_id = ?";
    db.query(deleteQuery, [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to delete product");
        }
        res.status(200).send("Product deleted successfully");
    });
});

//Add products to store

router.post('/storeproduct/add', (req, res) => {
    const { product_id, store_id, price } = req.body;
    const insertQuery = "INSERT INTO storeproducts (product_id, store_id, price) VALUES (?, ?, ?)";
    db.query(insertQuery, [product_id, store_id, price], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to add product to store");
        }
        res.status(201).send({message: "Product added to store successfully", storeProductId: result.insertId});
    });
});

//Update Product in Store

router.put('/storeproduct/update/:id', (req, res) => {
    const storeProductId = req.params.id;
    const { price } = req.body; // Assuming you might want to update the price
    const updateQuery = "UPDATE storeproducts SET price = ? WHERE store_product_id = ?";
    db.query(updateQuery, [price, storeProductId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to update product in store");
        }
        res.status(200).send("Product in store updated successfully");
    });
});

//List Products in a Store

router.get('/storeproducts/:store_id', (req, res) => {
    const storeId = req.params.store_id;
    const selectQuery = "SELECT p.*, sp.price, sp.store_product_id FROM StoreProducts sp JOIN product p ON sp.product_id = p.product_id WHERE sp.store_id = ?";
    db.query(selectQuery, [storeId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to retrieve products for store");
        }
        res.json(results);
    });
});

//Delete Products from a Store

router.delete('/storeproduct/delete/:id', (req, res) => {
    const storeProductId = req.params.id;
    const deleteQuery = "DELETE FROM storeproducts WHERE store_product_id = ?";
    db.query(deleteQuery, [storeProductId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to delete product from store");
        }
        res.status(200).send("Product removed from store successfully");
    });
});

//Managing Products
// router.get('/products', (req, res) => {
//     let { page, pageSize, category } = req.query;
//     page = page || 1;
//     pageSize = pageSize || 10;
//     let query = "SELECT * FROM Product";
//     let queryParams = [];

//     if (category) {
//         query += " WHERE category = ?";
//         queryParams.push(category);
//     }

//     query += " LIMIT ? OFFSET ?";
//     const offset = (page - 1) * pageSize;
//     queryParams.push(parseInt(pageSize), offset);

//     db.query(query, queryParams, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Failed to retrieve products");
//         }
//         res.json(results);
//     });
// });

// View orders

router.get('/orders', (req, res) => {
    const { page, pageSize } = req.query;
    const limit = parseInt(pageSize) || 10;
    const offset = ((parseInt(page) || 1) - 1) * limit;

    const query = "SELECT * FROM orders LIMIT ? OFFSET ?";
    db.query(query, [limit, offset], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to retrieve orders");
        }
        res.json(results);
    });
});

// Edit customer details

router.put('/customer/update/:id', (req, res) => {
    const customerId = req.params.id;
    const { name, email, address } = req.body;
    const query = "UPDATE userregistration SET name = ?, email = ?, address = ? WHERE user_id = ?";
    db.query(query, [name, email, address, customerId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to update customer information");
        }
        res.send("Customer information updated successfully");
    });
});
//Update Inventory 

router.put('/inventory/update/:productId', (req, res) => {
    const productId = req.params.productId;
    const { stock } = req.body; // This is the new stock level
    const query = "UPDATE product SET quantity = ? WHERE product_id = ?";
    db.query(query, [stock, productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to update inventory");
        }
        res.send("Inventory updated successfully");
    });
});

//Process Orders

router.put('/orders/process/:id', (req, res) => {
    const orderId = req.params.id;
    const query = "UPDATE orders SET order_status = 'Processed' WHERE order_id = ?";
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to process order");
        }
        res.send("Order processed successfully");
    });
});

// Get price from store products
router.get('/product/price/:productId/:storeId', (req, res) => {
    const { productId, storeId } = req.params;
  
    const query = `
      SELECT p.product_name, sp.price
      FROM storeproducts sp
      JOIN product p ON sp.product_id = p.product_id
      WHERE sp.product_id = ? AND sp.store_id = ?;
    `;
  
    db.query(query, [productId, storeId], (err, result) => {
      if (err) {
        console.error('Failed to retrieve product price:', err);
        return res.status(500).send('Failed to retrieve product price');
      }
  
      if (result.length === 0) {
        return res.status(404).send('Product or store not found');
      }
  
      res.json(result[0]);
    });
  });

  
// Route to get product and store information
router.get('/productWithStores/:productId', (req, res) => {
    const productId = req.params.productId;
  
    // Query to get product information
    const productQuery = `
      SELECT p.*
      FROM product p
      JOIN storeproducts sp ON p.product_id = sp.product_id
      WHERE p.product_id = ?
    `;
  
    // Query to get store information for the product
    const storeQuery = `
      SELECT sp.product_id, sp.price, sp.store_id, s.store_name, sp.quantity 
      FROM storeproducts sp
      JOIN stores s ON sp.store_id = s.store_id
      WHERE sp.product_id = ?
    `;
  
    // Execute the product query first
    db.query(productQuery, [productId], (err, productResult) => {
      if (err) throw err;
  
      // If the product is found, execute the store query
      if (productResult.length > 0) {
        const product = productResult[0];
        db.query(storeQuery, [productId], (err, storeResult) => {
            // console.log(storeResult)
          if (err) throw err;
          // Prepare the response array
          const response = storeResult.map(store => ({
            product_id: product.product_id,
            productname: product.product_name,
            description: product.description,
            image_url_tesco : product.image_url_tesco,
            image_url_aldi : product.image_url_aldi,
            image_url_lidl : product.image_url_lidl,
            category: product.category,
            quantity: store.quantity,
            storeName: store.store_name,
            price: store.price,
            store_id : store.store_id
          }));
          res.json(response);
        });
      } else {
        // If the product is not found, return an appropriate response
        res.status(404).json({ error: 'Product not found' });
      }
    });
  });

  router.put('/product/:productId/:storeId/updateStock', (req, res) => {
    const productId = req.params.productId;
    const storeId=req.params.storeId;
    const { newQuantity } = req.body;

    // Check if the product exists before updating the stock
    const checkProductQuery = "SELECT * FROM storeproducts WHERE product_id = ? AND store_id=?";
    db.query(checkProductQuery, [productId,storeId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the stock quantity of the product
        const updateStockQuery = "UPDATE storeproducts SET quantity = ? WHERE product_id = ? AND store_id=?";
        db.query(updateStockQuery, [newQuantity, productId,storeId], (errUpdate, resultUpdate) => {
            if (errUpdate) {
                console.error(errUpdate);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Stock quantity updated successfully' });
        });
    });
});

  export default router;