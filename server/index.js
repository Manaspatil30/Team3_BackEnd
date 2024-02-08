const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3001, (req, res)=>{
    console.log("Server is running at port 3001");
})

const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "unikartdatabase"
})

app.get('/',(req,res)=>{
    const selectQuery = "SELECT * from userregistration"
    db.query(selectQuery,(err, result)=>{
        if(err) {console.log(err)};
        res.send(result)
    })
})

app.get('/user/:id', (req, res) => {
    const userId = 1;
    const selectQuery = "SELECT * FROM userregistration WHERE user_id = ?";
    db.query(selectQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

app.post('/user/add', (req, res) => {
    const { first_name, last_name, phone_number, email, address, membership, start_date, end_date } = req.body;
    const insertQuery = "INSERT INTO userregistration (first_name, last_name, phone_number, email, address, membership, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [first_name, last_name, phone_number, email, address, membership, start_date, end_date], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to add user");
        } else {
            res.status(201).send("User added successfully");
        }
    });
});

app.put('/user/update/:id', (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, phone_number, email, address, membership, start_date, end_date } = req.body;
    const updateQuery = "UPDATE userregistration SET first_name=?, last_name=?, phone_number=?, email=?, address=?, membership=?, start_date=?, end_date=? WHERE user_id=?";
    db.query(updateQuery, [first_name, last_name, phone_number, email, address, membership, start_date, end_date, userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to update user information");
        } else {
            res.status(200).send("User information updated successfully");
        }
    });
});

app.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;
    const deleteQuery = "DELETE FROM userregistration WHERE user_id=?";
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to delete user");
        } else {
            res.status(200).send("User deleted successfully");
        }
    });
});
// Route to get user's basket
app.get('/basket/:userId', (req, res) => {
    const userId = req.params.userId;
    const selectQuery = `SELECT b.*, p.product_name, p.price
                        FROM user_basket b
                        JOIN product p ON b.product_id = p.product_id
                        WHERE b.user_id = ${userId}`;
    
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(result);
        }
    });
});

// Route to add a product to the user's basket
app.post('/basket/add', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const insertQuery = `INSERT INTO user_basket (user_id, product_id, quantity) 
                         VALUES (${userId}, ${productId}, ${quantity})`;
    
    db.query(insertQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Product added to the basket successfully' });
        }
    });
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
    });
    
    // Route to get all store addresses
app.get('/api/store-addresses', (req, res) => {
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

});