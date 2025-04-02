const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool for better performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Max connections in the pool
    queueLimit: 0
});

// Check if the connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool to use in other files
module.exports = pool;
