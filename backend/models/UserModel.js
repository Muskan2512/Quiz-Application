const db = require("../db");

const User = {
    createUser: (username, email, hashedPassword, role, callback) => {
        const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(sql, [username, email, hashedPassword, role], callback);
    },
    getUserByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], callback);
    },
    getUserByUsername: (username, callback) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.query(sql, [username], callback);
    }
};

module.exports = User;

