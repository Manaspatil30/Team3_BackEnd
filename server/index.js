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