import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Sales Routes
router.get('/sales', async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const totalSales = await getTotalSales(timePeriod);
    res.json({ totalSales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sales/category', async (req, res) => {
  try {
    const { timePeriod, category } = req.query;
    const salesByCategory = await getSalesByCategory(timePeriod, category);
    res.json(salesByCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sales/stores', async (req, res) => {
  try {
    const { timePeriod, store } = req.query;
    const salesByStore = await getSalesByStore(timePeriod, store);
    res.json(salesByStore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Product Routes
router.get('/products/popular', async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const popularProducts = await getPopularProducts(timePeriod);
    res.json(popularProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/bestsellers', async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const bestSellingProducts = await getBestSellingProducts(timePeriod);
    res.json(bestSellingProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/inventory', async (req, res) => {
  try {
    const { timePeriod, category } = req.query;
    const inventoryLevels = await getInventoryLevels(timePeriod, category);
    res.json(inventoryLevels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Store Routes
router.get('/stores/revenue', async (req, res) => {
  try {
    const { timePeriod, store } = req.query;
    const revenueOverTime = await getRevenueOverTime(timePeriod, store);
    res.json(revenueOverTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/stores/refunds', async (req, res) => {
  try {
    const { timePeriod, store } = req.query;
    const refundsOverTime = await getRefundsOverTime(timePeriod, store);
    res.json(refundsOverTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/stores/revenue/category', async (req, res) => {
  try {
    const { timePeriod, category, store } = req.query;
    const revenueByCategory = await getRevenueByCategory(timePeriod, category, store);
    res.json(revenueByCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Query Functions
const getTotalSales = async (timePeriod) => {
    const query = `
      SELECT SUM(od.quantity * od.price_at_purchase) AS total_sales
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      WHERE o.order_date BETWEEN ? AND ?
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
  
    try {
      const [results] = await db.query(query, [startDate, endDate]);
      if (results.length > 0) {
        return results[0].total_sales || 0;
      } else {
        return 0;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const getSalesByCategory = async (timePeriod, category) => {
    const query = `
      SELECT p.category, SUM(od.quantity * od.price_at_purchase) AS total_sales
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
      JOIN product p ON sp.product_id = p.product_id
      WHERE o.order_date BETWEEN ? AND ?
        AND p.category = ?
      GROUP BY p.category
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate, category]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const getSalesByStore = async (timePeriod, store) => {
    const query = `
      SELECT s.store_name, SUM(od.quantity * od.price_at_purchase) AS total_sales
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
      JOIN stores s ON sp.store_id = s.store_id
      WHERE o.order_date BETWEEN ? AND ?
        AND s.store_id = ?
      GROUP BY s.store_id
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate, store]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

const getPopularProducts = async (timePeriod) => {
    const query = `
      SELECT p.product_id, p.product_name, COUNT(*) AS views
      FROM product p
      JOIN storeproducts sp ON p.product_id = sp.product_id
      JOIN orderdetails od ON sp.store_product_id = od.store_product_id
      JOIN orders o ON od.order_id = o.order_id
      WHERE o.order_date BETWEEN ? AND ?
      GROUP BY p.product_id
      ORDER BY views DESC
      LIMIT 10
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
const getBestSellingProducts = async (timePeriod) => {
  const query = `
    SELECT p.product_name, SUM(od.quantity) AS total_quantity
    FROM product p
    JOIN storeproducts sp ON p.product_id = sp.product_id
    JOIN orderdetails od ON sp.store_product_id = od.store_product_id
    JOIN orders o ON od.order_id = o.order_id
    WHERE o.order_date BETWEEN ? AND ?
    GROUP BY p.product_id
    ORDER BY total_quantity DESC
    LIMIT 10
  `;
  const [startDate, endDate] = getDateRange(timePeriod);
  const [results] = await db.query(query, [startDate, endDate]);
  return results;
};

const getInventoryLevels = async (timePeriod, category) => {
    const query = `
      SELECT p.product_name, sp.quantity AS inventory
      FROM product p
      JOIN storeproducts sp ON p.product_id = sp.product_id
      WHERE p.category = ?
      ORDER BY sp.quantity DESC
      LIMIT 10
    `;
    // Note: This function does not utilize timePeriod since inventory levels are current, not historical.
    try {
      const [results] = await db.query(query, [category]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const getRevenueOverTime = async (timePeriod, store) => {
    const query = `
      SELECT DATE_FORMAT(o.order_date, '%Y-%m-%d') AS date, SUM(od.quantity * od.price_at_purchase) AS revenue
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
      JOIN stores s ON sp.store_id = s.store_id
      WHERE o.order_date BETWEEN ? AND ?
        AND s.store_id = ?
      GROUP BY DATE_FORMAT(o.order_date, '%Y-%m-%d')
      ORDER BY date
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate, store]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const getRefundsOverTime = async (timePeriod, store) => {
    const query = `
      SELECT DATE_FORMAT(o.updated_at, '%Y-%m-%d') AS date, COUNT(*) AS refunds
      FROM orders o
      WHERE o.updated_at BETWEEN ? AND ?
        AND o.returned = 1
        AND o.store_id = ?
      GROUP BY DATE_FORMAT(o.updated_at, '%Y-%m-%d')
      ORDER BY date
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate, store]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  const getRevenueByCategory = async (timePeriod, category, store) => {
    const query = `
      SELECT p.category, SUM(od.quantity * od.price_at_purchase) AS revenue
      FROM orders o
      JOIN orderdetails od ON o.order_id = od.order_id
      JOIN storeproducts sp ON od.store_product_id = sp.store_product_id
      JOIN product p ON sp.product_id = p.product_id
      JOIN stores s ON sp.store_id = s.store_id
      WHERE o.order_date BETWEEN ? AND ?
        AND p.category = ?
        AND s.store_id = ?
      GROUP BY p.category
    `;
    const [startDate, endDate] = getDateRange(timePeriod);
    try {
      const [results] = await db.query(query, [startDate, endDate, category, store]);
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

const getDateRange = (timePeriod) => {
  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  switch (timePeriod) {
    case 'daily':
      startDate.setDate(today.getDate() - 1);
      break;
    case 'weekly':
      startDate.setDate(today.getDate() - 7);
      break;
    case 'monthly':
      startDate.setMonth(today.getMonth() - 1);
      break;
    case 'yearly':
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    default:
      throw new Error('Invalid time period');
  }

  endDate.setHours(23, 59, 59, 999);
  return [startDate, endDate];
};

export default router;