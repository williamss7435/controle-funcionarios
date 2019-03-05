const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db_employees"
});


module.exports  = conn;