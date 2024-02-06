const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
    console.log("Server is running at port 3001");
});

const db = mysql.createPool({
    host: 'localhost',
<<<<<<< Updated upstream
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
=======
    user: 'root',
    password: '',
    database: 'unikart_database'
});

app.get('/', (req, res) => {
    const selectQuery = "SELECT * from userregistration";
    db.query(selectQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
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
>>>>>>> Stashed changes
