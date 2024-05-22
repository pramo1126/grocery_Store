const mysql = require('mysql2/promise');
//dotenv
require("dotenv").config();

const pool = mysql.createPool({
    host: "srv1327.hstgr.io",
    user: "u323893650_pramo",
    password: "Pramo####1234ll",
    database: "u323893650_grocery_store"
    // u323893650_grocery_store	

    // connectionLimit: 10 // number of connections you want to allow at once
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query("SELECT 1");
        connection.release();
        console.log('Database connection established');
    } catch (err) {
        console.error('Error checking MySQL connection:', err);
        throw err;
    }
};

module.exports = { pool, checkConnection };