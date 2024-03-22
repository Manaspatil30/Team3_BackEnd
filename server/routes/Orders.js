import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const app = express();
const router = express.Router();

const secretKey = crypto.randomBytes(32).toString('hex');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const query = (sql, params) => new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  
  // Place an order
  
  router.post('/order', authMiddleware, async (req, res) => {
    const { basket_id, user_id, delivery_address } = req.body;
    const queryText = "INSERT INTO Orders (basket_id, user_id, delivery_address, order_status) VALUES (?, ?, ?, 'Pending')";
  
    try {
      const result = await query(queryText, [basket_id, user_id, delivery_address]);
  
      // Simulate the delivery process by scheduling an update to the order status 2 days after the order is placed.
      // For demonstration purposes, this will be set to 2 minutes (2 * 60 * 1000 milliseconds).
      setTimeout(async () => {
        const deliveryQuery = "UPDATE Orders SET order_status = 'Delivered' WHERE order_id = ?";
        try {
          await query(deliveryQuery, [result.insertId]);
          console.log(`Order ${result.insertId} marked as delivered.`);
        } catch (err) {
          console.error(`Failed to update order status to delivered for order ${result.insertId}`, err);
        }
      }, 2 * 60 * 1000); // Change this to 2 * 24 * 60 * 60 * 1000 for 2 days
  
      res.status(201).json({ message: "Order placed successfully", orderId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to place order" });
    }
  });
  
  
  // Get all orders for a user
  router.get('/orders/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;
    const queryText = "SELECT * FROM Orders WHERE user_id = ?";
  
    try {
      const results = await query(queryText, [userId]);
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve orders" });
    }
  });
// get specific order
  router.get('/order/:orderId', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const queryText = `
      SELECT o.*, bi.quantity, p.product_name
      FROM Orders o
      JOIN Basket b ON o.basket_id = b.basket_id
      JOIN BasketItems bi ON b.basket_id = bi.basket_id
      JOIN Product p ON bi.product_id = p.product_id
      WHERE o.order_id = ?
    `;
  
    try {
      const results = await query(queryText, [orderId]);
      if (results.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve order details" });
    }
  });
  

// Update Order Status (Admin Only)
router.put('/order/:orderId/status', authMiddleware, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
  
    const { order_status } = req.body;
    const { orderId } = req.params;
    const queryText = "UPDATE Orders SET order_status = ? WHERE order_id = ?";
  
    try {
      const result = await query(queryText, [order_status, orderId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found." });
      }
      res.json({ message: "Order status updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update order status." });
    }
  });

  
  // cancel order admin only
  router.delete('/order/:orderId/cancel', authMiddleware, async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Only admins can cancel orders." });
    }
  
    const { orderId } = req.params;
    const queryText = "DELETE FROM Orders WHERE order_id = ?";
  
    try {
      const result = await query(queryText, [orderId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found or already canceled." });
      }
      res.json({ message: "Order canceled successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error while attempting to cancel order" });
    }
  });

  //update basket items
  
  router.put('/basketitem/:basketItemId', authMiddleware, async (req, res) => {
    const { basketItemId } = req.params;
    const { quantity } = req.body; // Assuming you're only updating quantity

    try {
        // Ensure the basket item exists and belongs to the authenticated user
        const query = "UPDATE BasketItems SET quantity = ? WHERE basket_id = ? AND user_id = ?";
        const result = await queryAsync(query, [quantity, basketItemId, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).send("Basket item not found or not owned by the user.");
        }
        
        res.send("Basket item updated successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while updating basket item");
    }
});

// return 
router.post('/order/:orderId/return', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id; // Assuming this is set in JWT payload
  
    const queryText = `
      UPDATE Orders 
      SET returned = 1
      WHERE order_id = ? AND user_id = ? AND returned = 0
    `;
  
    try {
      const result = await query(queryText, [orderId, userId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Order not found, not eligible for return, or already returned." });
      }
      res.json({ message: "Order return processed successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error processing return" });
    }
  });

  // order history
  router.get('/orders/history', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Assuming userId is set correctly in the JWT payload
    const { status, startDate, endDate, returned } = req.query;
    let queryText = "SELECT * FROM Orders WHERE user_id = ?";
    let queryParams = [userId];
  
    if (status) {
      queryText += " AND order_status = ?";
      queryParams.push(status);
    }
    if (returned) {
      queryText += " AND returned = ?";
      queryParams.push(returned);
    }
    if (startDate) {
      queryText += " AND order_date >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      queryText += " AND order_date <= ?";
      queryParams.push(endDate);
    }
  
    try {
      const results = await query(queryText, queryParams);
      if (results.length === 0) {
        return res.status(404).json({ error: "No orders found matching criteria" });
      }
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve order history" });
    }
  });
  

  //Route for todays sales
  router.get('/sales/today', authMiddleware, async (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  
    const queryText = `
      SELECT SUM(bi.price * bi.quantity) AS total_sales
      FROM orders o
      JOIN basket b ON o.basket_id = b.basket_id
      JOIN basketitems bi ON b.basket_id = bi.basket_id
      WHERE DATE(o.order_date) = ?
    `;
  
    try {
      const result = await query(queryText, [today]);
      res.json({ date: today, total_sales: result[0].total_sales || 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to calculate today's sales" });
    }
  });
// amout of sales for a particular day 

// Route to get the total sales amount for a specific day
router.get('/sales/:date', authMiddleware, async (req, res) => {
    const { date } = req.params; // Expected date format: YYYY-MM-DD
    const queryText = `
        SELECT DATE(o.order_date) AS sale_date, SUM(od.price_at_purchase * od.quantity) AS total_sales
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        WHERE DATE(o.order_date) = ?
        GROUP BY DATE(o.order_date)
    `;

    try {
        const results = await query(queryText, [date]);
        if (results.length > 0) {
            res.json({ date: results[0].sale_date, total_sales: results[0].total_sales });
        } else {
            // No sales for the given date
            res.json({ date, total_sales: 0 });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve sales for the specified date" });
    }
});

  //route for out of stock

  router.get('/products/outofstock', async (req, res) => {
    const queryText = "SELECT * FROM product WHERE quantity <= 0";
  
    try {
      const products = await query(queryText);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve out of stock products" });
    }
  });

  // route for all sales

  router.get('/sales/all', authMiddleware, async (req, res) => {
    const queryText = `
      SELECT SUM(bi.price * bi.quantity) AS total_sales
      FROM orders o
      JOIN basket b ON o.basket_id = b.basket_id
      JOIN basketitems bi ON b.basket_id = bi.basket_id
    `;
  
    try {
      const result = await query(queryText);
      res.json({ total_sales: result[0].total_sales || 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to calculate total sales" });
    }
  });

  // Route to get sales and deliveries for a specific day, with deliveries marked 2 minutes after order placement
router.get('/sales-deliveries/:date', authMiddleware, async (req, res) => {
    const { date } = req.params; // Expected date format: YYYY-MM-DD

    // Query to get total sales for the date
    const salesQuery = `
        SELECT DATE(order_date) AS sale_date, SUM(price_at_purchase * quantity) AS total_sales
        FROM orders
        JOIN orderdetails ON orders.order_id = orderdetails.order_id
        WHERE DATE(order_date) = ?
        GROUP BY DATE(order_date)
    `;

    // Query to count deliveries for the date, considering delivery marked 2 minutes after order placement
    // This logic is simplified for demonstration. In a real application, you'd track the exact delivery time.
    const deliveryQuery = `
        SELECT COUNT(*) AS total_deliveries
        FROM orders
        WHERE DATE(order_date) = ? AND order_status = 'Delivered'
        AND TIMESTAMPDIFF(MINUTE, order_date, NOW()) BETWEEN 0 AND 2
    `;

    try {
        // Execute both queries concurrently
        const [salesResults, deliveryResults] = await Promise.all([
            query(salesQuery, [date]),
            query(deliveryQuery, [date])
        ]);

        const totalSales = salesResults.length > 0 ? salesResults[0].total_sales : 0;
        const totalDeliveries = deliveryResults[0].total_deliveries;

        res.json({
            date,
            total_sales: totalSales,
            total_deliveries: totalDeliveries
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve sales and deliveries data" });
    }
});
  
export default router;