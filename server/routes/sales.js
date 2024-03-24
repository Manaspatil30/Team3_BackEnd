// salesRoutes.js
import express from 'express';
import db from '../config/db.js'; // Adjust according to your file structure

const router = express.Router();

// Helper function to determine the date range
const getDateRange = (timePeriod) => {
  const endDate = new Date();
  const startDate = new Date();

  switch (timePeriod) {
    case 'daily':
      startDate.setDate(endDate.getDate() - 1);
      break;
    case 'weekly':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case 'monthly':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case 'yearly':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      throw new Error('Invalid time period');
  }

  return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
};

// Example route: Total Sales
router.get('/sales', async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const [startDate, endDate] = getDateRange(timePeriod);
    const query = `
      SELECT SUM(od.quantity * od.price_at_purchase) AS total_sales
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      WHERE DATE(o.order_date) BETWEEN ? AND ?;
    `;
    const [results] = await db.execute(query, [startDate, endDate]);
    res.json({ totalSales: results[0].total_sales || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Sales by Category
router.get('/sales/category', async (req, res) => {
    try {
      const { timePeriod, category } = req.query;
      const [startDate, endDate] = getDateRange(timePeriod);
      const query = `
        SELECT p.category, SUM(od.quantity * od.price_at_purchase) AS total_sales
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE DATE(o.order_date) BETWEEN ? AND ? AND p.category = ?
        GROUP BY p.category;
      `;
      const [results] = await db.execute(query, [startDate, endDate, category]);
      res.json({ salesByCategory: results });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Sales by Store
  router.get('/sales/stores', async (req, res) => {
    try {
      const { timePeriod, store } = req.query;
      const [startDate, endDate] = getDateRange(timePeriod);
      const query = `
        SELECT s.store_name, SUM(od.quantity * od.price_at_purchase) AS total_sales
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
        JOIN stores s ON sp.store_id = s.store_id
        WHERE DATE(o.order_date) BETWEEN ? AND ? AND s.store_id = ?
        GROUP BY s.store_id;
      `;
      const [results] = await db.execute(query, [startDate, endDate, store]);
      res.json({ salesByStore: results });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Popular Products
  router.get('/products/popular', async (req, res) => {
    try {
      const { timePeriod } = req.query;
      const [startDate, endDate] = getDateRange(timePeriod);
      const query = `
        SELECT p.product_name, COUNT(*) AS views
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE DATE(o.order_date) BETWEEN ? AND ?
        GROUP BY p.product_id
        ORDER BY views DESC
        LIMIT 10;
      `;
      const [results] = await db.execute(query, [startDate, endDate]);
      res.json({ popularProducts: results });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Best Selling Products
  router.get('/products/bestsellers', async (req, res) => {
    try {
      const { timePeriod } = req.query;
      const [startDate, endDate] = getDateRange(timePeriod);
      const query = `
        SELECT p.product_name, SUM(od.quantity) AS total_quantity
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN product p ON od.product_id = p.product_id
        WHERE DATE(o.order_date) BETWEEN ? AND ?
        GROUP BY p.product_id
        ORDER BY total_quantity DESC
        LIMIT 10;
      `;
      const [results] = await db.execute(query, [startDate, endDate]);
      res.json({ bestSellingProducts: results });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Inventory Levels
  router.get('/products/inventory', async (req, res) => {
    try {
      const { timePeriod, category } = req.query;
      const [startDate, endDate] = getDateRange(timePeriod);
      const query = `
        SELECT p.product_name, sp.quantity AS inventory
        FROM product p
        JOIN storeproducts sp ON p.product_id = sp.product_id
        WHERE p.category = ?
        ORDER BY inventory DESC
        LIMIT 10;
      `;
      const [results] = await db.execute(query, [category]);
      res.json({ inventoryLevels: results });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;