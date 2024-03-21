import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import db from './config/db.js'
import authentication from './routes/authentication.js'
import baskets from './routes/baskets.js'
import filterRoutes from './routes/filterRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import productRoutes from './routes/productsRoutes.js'
import searchRoutes from './routes/searchRoutes.js'

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// Use image routes
// app.use('/admin/images', imageRoutes);
//admin registration routes
// app.use('/admin', adminRoutes);
app.use('/', productRoutes)
app.use('/', authentication)
app.use('/', baskets)
app.use('/', filterRoutes)
app.use('/', imageRoutes);
app.use('/', searchRoutes)

app.listen(3001, (req, res)=>{
    console.log("Server is running at port 3001");
})





// Protected Route Example
// app.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'Protected Route Accessed Successfully' });
// });



// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
//     jwt.verify(token, secretKey, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Authentication failed. Invalid token.' });
//         req.user = user;
//         next();
//     });
// }


// Endpoint to generate a client token for the Braintree client
app.get('/client_token', async (req, res) => {
    try {
        const response = await gateway.clientToken.generate({});
        res.send(response.clientToken);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to generate client token');
    }
});

// Endpoint to process a payment
app.post('/checkout', async (req, res) => {
    const { amount, payment_method_nonce } = req.body;

    try {
        const saleRequest = {
            amount: amount,
            paymentMethodNonce: payment_method_nonce,
            options: {
                submitForSettlement: true
            }
        };

        const result = await gateway.transaction.sale(saleRequest);

        if (result.success || result.transaction) {
            res.status(200).send("Payment successful");
        } else {
            res.status(400).send("Payment failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to process payment');
    }
});

// Route to place a new order
app.post('/orders/place', (req, res) => {
    const { userId, basketId, orderStatus, deliveryAddress } = req.body;
    const insertOrderQuery = `
        INSERT INTO orders (basket_id, user_id, order_status, delivery_address)
        VALUES (${basketId}, ${userId}, '${orderStatus}', '${deliveryAddress}')
    `;

    db.query(insertOrderQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const orderId = result.insertId;

            // Move basket items to order details
            const moveItemsQuery = `
                INSERT INTO orderdetails (order_id, store_product_id, quantity, price_at_purchase)
                SELECT ${orderId}, b.store_product_id, b.quantity, sp.price
                FROM user_basket b
                JOIN storeproducts sp ON b.store_product_id = sp.store_product_id
                WHERE b.user_id = ${userId}
            `;

            db.query(moveItemsQuery, (errMove, resultMove) => {
                if (errMove) {
                    console.log(errMove);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // Clear the user's basket after the order is placed
                    const clearBasketQuery = `DELETE FROM user_basket WHERE user_id = ${userId}`;
                    db.query(clearBasketQuery, (errClear, resultClear) => {
                        if (errClear) {
                            console.log(errClear);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            res.status(201).json({ message: 'Order placed successfully' });
                        }
                    });
                }
            });
        }
    })
    
    // Route to get all store addresses
app.get('/api/storeAddress', (req, res) => {
    const selectQuery = 'SELECT * FROM store_addresses';
    
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result);
        }
    });
});

// Endpoint to get price comparisons for a specific product
router.get('/api/price-comparison/:productId', (req, res) => {
    const productId = req.params.productId;

    // Query to fetch prices from storeproducts table for the given product
    const selectQuery = `
        SELECT s.store_name, sp.price
        FROM storeproducts sp
        JOIN stores s ON sp.store_id = s.store_id
        WHERE sp.product_id = ?;
    `;

    db.query(selectQuery, [productId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Prepare response object
            const prices = result.map(row => ({
                store_name: row.store_name,
                price: row.price
            }));

            res.json(prices);
        }
    });
});
//  Grocery products by price range
router.get('/api/grocery-by-price/:minPrice/:maxPrice', (req, res) => {
    const minPrice = parseFloat(req.params.minPrice);
    const maxPrice = parseFloat(req.params.maxPrice);

    // Query to fetch grocery products within the specified price range
    const selectQuery = `
        SELECT p.product_name, p.description, p.category, sp.price
        FROM product p
        JOIN storeproducts sp ON p.product_id = sp.product_id
        WHERE sp.price BETWEEN ? AND ?;
    `;
    db.query(selectQuery, [minPrice, maxPrice], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Prepare response object
            const groceryList = result.map(row => ({
                product_name: row.product_name,
                description: row.description,
                category: row.category,
                price: row.price
            }));

            res.json(groceryList);
        }
    });
});
});













/* Sign up and sign in*/

// Sign Up Route
app.post('/signup', async (req, res) => {
    const { first_name, last_name, phone_number, email, address, password, MembershipTypeID } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO userregistration (first_name, last_name, phone_number, email, address, password, MembershipTypeID) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, [first_name, last_name, phone_number, email, address, password, MembershipTypeID], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Sign In Route

// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(32).toString('hex');

// app.post('/signin', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const selectQuery = "SELECT * FROM userregistration WHERE email = ?";
//         db.query(selectQuery, [email], async (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//             if (result.length === 0) {
//                 return res.status(401).json({ error: 'Authentication failed. User not found.' });
//             }
//             const user = result[0];
//             const passwordMatch = bcrypt.compare(password, user.password);
//             if (!passwordMatch) {
//                 return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
//             }
//             const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, { expiresIn: '1h' });
//             res.status(200).json({ token: token, userId: user.user_id });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Protected Route Example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected Route Accessed Successfully' });
});



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Authentication failed. Invalid token.' });
        req.user = user;
        next();
    });
}


/*Payment  gateway integration*/


// const gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: 'rppzqr3dvsk2xbst',
//     publicKey: 'xd9v7ggwgj862p6n',
//     privateKey: 'd9c9af7064b85534a5d13e4ea349f38f'
// });

// Endpoint to generate a client token for the Braintree client
app.get('/client_token', async (req, res) => {
    try {
        const response = await gateway.clientToken.generate({});
        res.send(response.clientToken);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to generate client token');
    }
});

// Endpoint to process a payment
app.post('/checkout', async (req, res) => {
    const { amount, payment_method_nonce } = req.body;

    try {
        const saleRequest = {
            amount: amount,
            paymentMethodNonce: payment_method_nonce,
            options: {
                submitForSettlement: true
            }
        };

        const result = await gateway.transaction.sale(saleRequest);

        if (result.success || result.transaction) {
            res.status(200).send("Payment successful");
        } else {
            res.status(400).send("Payment failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to process payment');
    }
});
  
  

/* Rating and review route*/

// Define routes for product ratings and reviews
app.post('/api/product/:product_id/rate', (req, res) => {
    const productId = req.params.product_id;
    const { user_id, rating } = req.body;

    // Insert the rating into the database
    const sql = `INSERT INTO product_ratings (user_id, product_id, rating) VALUES (?, ?, ?)`;
    connection.query(sql, [user_id, productId, rating], (err, result) => {
        if (err) {
            console.error('Error rating the product: ', err);
            res.status(500).json({ error: 'Error rating the product' });
            return;
        }
        res.status(201).json({ message: 'Product rated successfully' });
    });
});

app.get('/api/product/:product_id/ratings', (req, res) => {
    const productId = req.params.product_id;

    // Retrieve ratings for the product from the database
    const sql = `SELECT rating FROM product_ratings WHERE product_id = ?`;
    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error retrieving ratings: ', err);
            res.status(500).json({ error: 'Error retrieving ratings' });
            return;
        }
        const ratings = results.map((result) => result.rating);
        res.status(200).json({ ratings });
    });
});

app.post('/api/product/:product_id/review', (req, res) => {
    const productId = req.params.product_id;
    const { user_id, review } = req.body;

    // Insert the review into the database
    const sql = `INSERT INTO product_reviews (user_id, product_id, review) VALUES (?, ?, ?)`;
    connection.query(sql, [user_id, productId, review], (err, result) => {
        if (err) {
            console.error('Error reviewing the product: ', err);
            res.status(500).json({ error: 'Error reviewing the product' });
            return;
        }
        res.status(201).json({ message: 'Product reviewed successfully' });
    });
});

app.get('/api/product/:product_id/reviews', (req, res) => {
    const productId = req.params.product_id;

    // Retrieve reviews for the product from the database
    const sql = `SELECT review FROM product_reviews WHERE product_id = ?`;
    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error retrieving reviews: ', err);
            res.status(500).json({ error: 'Error retrieving reviews' });
            return;
        }
        const reviews = results.map((result) => result.review);
        res.status(200).json({ reviews });
    });
});

//Sign up with hash

app.post('/signup', async (req, res) => {
    const { first_name, last_name, phone_number, email, address, password, MembershipTypeID } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO userregistration (first_name, last_name, phone_number, email, address, password, MembershipTypeID) VALUES (?, ?, ?, ?, ?, ?, ?)";
        // Ensure you're passing the hashedPassword instead of password
        db.query(insertQuery, [first_name, last_name, phone_number, email, address, hashedPassword, MembershipTypeID], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// get users

app.get('/users', authenticateToken, (req, res) => {
    // Add authorization check for admin role if needed
    const query = "SELECT user_id, first_name, last_name, phone_number, email, address, MembershipTypeID FROM userregistration";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});
//update users

app.put('/user/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;
    const { first_name, last_name, phone_number, email, address, MembershipTypeID } = req.body;
    // Exclude password update for simplicity, handle separately with extra security
    const updateQuery = "UPDATE userregistration SET first_name = ?, last_name = ?, phone_number = ?, email = ?, address = ?, MembershipTypeID = ? WHERE user_id = ?";
    db.query(updateQuery, [first_name, last_name, phone_number, email, address, MembershipTypeID, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    });
});
// delete users

app.delete('/user/:userId', authenticateToken, (req, res) => {
    const { userId } = req.params;
    // Add authorization check for admin or the user themselves
    const deleteQuery = "DELETE FROM userregistration WHERE user_id = ?";
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});


// admin routes
// add a new admin

app.post('/admin', authenticateToken, async (req, res) => {
    // Add authorization check for super admin role
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO admins (username, password, email) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, hashedPassword, email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Admin created successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// get admins 
app.get('/admins', authenticateToken, (req, res) => {
    // Add authorization check for super admin role
    const query = "SELECT admin_id, username, email FROM admins";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// update admin

app.put('/admin/:adminId', authenticateToken, async (req, res) => {
    const { adminId } = req.params;
    const { username, email } = req.body;
    // Exclude password update for simplicity, handle separately with extra security
    const updateQuery = "UPDATE admins SET username = ?, email = ? WHERE admin_id = ?";
    db.query(updateQuery, [username, email, adminId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin updated successfully' });
    });
});


//remove admin

app.delete('/admin/:adminId', authenticateToken, (req, res) => {
    const { adminId } = req.params;
    // Add authorization check for super admin
    const deleteQuery = "DELETE FROM admins WHERE admin_id = ?";
    db.query(deleteQuery, [adminId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    });
});

// rate limit for logging in 
const rateLimit = (req, res, next) => {
    const ip_address = req.ip;
    const endpoint = req.originalUrl; // Or a specific identifier for the route
    const limit = 100; // Max requests per hour
    const query = `
        INSERT INTO rate_limiting (ip_address, endpoint, request_count)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE request_count = request_count + 1, last_request = CURRENT_TIMESTAMP;
    `;

    // Check current count and last request timestamp
    db.query(query, [ip_address, endpoint], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error checking rate limit");
        }

        // Fetch the row to check request count and timestamp
        db.query('SELECT request_count, last_request FROM rate_limiting WHERE ip_address = ? AND endpoint = ?', [ip_address, endpoint], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error fetching rate limit data");
            }
            const data = rows[0];
            if (data && data.request_count > limit && new Date() - data.last_request < 3600000) { // 3600000 ms = 1 hour
                return res.status(429).send("Rate limit exceeded");
            } else {
                next();
            }
        });
    });
};

// log actions
const logAction = (userId, action, details) => {
    const query = "INSERT INTO audit_logs (user_id, action, details) VALUES (?, ?, ?)";
    db.query(query, [userId, action, details], (err, result) => {
        if (err) {
            console.error("Error logging action:", err);
        }
    });
};


export default app;
