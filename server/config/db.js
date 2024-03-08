const mysql = require('mysql')
const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "unikartdatabase"
})

module.exports=db;
