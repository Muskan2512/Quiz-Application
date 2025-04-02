const db = require("../db");

const Score = {
    addScore: (userId, quizId, score, callback) => {
        const sql = "INSERT INTO scores (user_id, quiz_id, score) VALUES (?, ?, ?)";
        db.query(sql, [userId, quizId, score], callback);
    },

    getScoresByUser: (userId, callback) => {
        const sql = "SELECT quizzes.title, scores.score FROM scores JOIN quizzes ON scores.quiz_id = quizzes.id WHERE scores.user_id = ?";
        db.query(sql, [userId], callback);
    }
};

module.exports = Score;
