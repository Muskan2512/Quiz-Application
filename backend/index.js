const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db"); // Import db.js
const app = express();
const authRoutes = require("./routes/authRoutes");
const quizRoutes=require("./routes/quizRoutes");
const scoreRoutes = require("./routes/scoreRoutes"); 
const cookieParser = require("cookie-parser");

// Middleware

app.use(express.json()); // ✅ Parses JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
app.use(cookieParser()); // ✅ Enables reading cookies
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // ✅ Adjust frontend origin if needed


app.use("/api/auth/v1",authRoutes);
app.use("/api/quiz/v1",quizRoutes);
app.use("/api/score/v1",scoreRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Quiz API is running...");
});

// Test database connection inside an API route
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: "Database connection failed" });
        }
        res.json({ message: "Database connected successfully", results });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
