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
    database: "uni_kart"
})

app.get('/',(req,res)=>{
    const selectQuery = "SELECT * from userregistration"
    db.query(selectQuery,(err, result)=>{
        if(err) {console.log(err)};
        res.send(result)
    })
})

app.get('/',(req,res)=>{
    const selectQuery = "SELECT * from "