// const mysql = require('mysql')
import mysql from 'mysql'
const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "unikartdatabase"
})

export default db;
