const db = require("../db");

const Question = {
    addQuestion: (quizId, questionText, optionA, optionB, optionC, optionD, correctAnswer, callback) => {
        const sql = `
            INSERT INTO questions 
            (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [quizId, questionText, optionA, optionB, optionC, optionD, correctAnswer], callback);
    },

    getQuestionsByQuizId: (quizId, callback) => {  // ✅ Make sure this function exists
        const sql = "SELECT * FROM questions WHERE quiz_id = ?";
        db.query(sql, [quizId], callback);
    }
};

// ✅ Export the module correctly
module.exports = Question;
