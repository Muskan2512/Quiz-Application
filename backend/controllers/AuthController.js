const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const SECRET_KEY = "123456"; // 🔴 Change this to a secure key

const authController = {
    signup: (req, res) => {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Allowed values: 'admin', 'user'" });
        }

        User.getUserByUsername(username, (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            if (results.length > 0) {
                return res.status(400).json({ message: "Username already exists" });
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ message: "Error hashing password" });

                User.createUser(username, email, hashedPassword, role, (err, result) => {
                    if (err) return res.status(500).json({ message: "Error creating user", error: err });

                    res.status(201).json({ message: "User registered successfully!" });
                });
            });
        });
    },

    login: (req, res) => {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        User.getUserByUsername(username, (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const user = results[0];

            if (user.role !== role) {
                return res.status(401).json({ message: "Role mismatch" });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).json({ message: "Error verifying password" });

                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid username or password" });
                }
                const payload={ id: user.id, username: user.username, role: user.role };
                const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

                return res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the token
        secure: false, // Set this to true if your site is served over HTTPS
        sameSite: 'None'
      }).status(200).json({ message: "Login successful", token,data:payload });
            });
        });
    }
};

module.exports = authController;
