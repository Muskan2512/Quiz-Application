const db = require("../db");

const Quiz = {
    createQuiz: (title, numQuestions, callback) => {
        const sql = "INSERT INTO quizzes (title, num_questions) VALUES (?, ?)";
        db.query(sql, [title, numQuestions], callback);
    },

    getAllQuizzes: (callback) => {
        const sql = "SELECT * FROM quizzes";
        db.query(sql, callback);
    },

    getQuizById: (quizId, callback) => {
        const sql = "SELECT * FROM quizzes WHERE id = ?";
        db.query(sql, [quizId], callback);
    }
};

module.exports = Quiz;
