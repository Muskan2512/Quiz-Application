const Quiz = require("../models/QuizModel");
const Question = require("../models/QuestionModel");

const quizController = {
    createQuiz: (req, res) => {
        const { title, numQuestions, questions } = req.body;
        // console.log(title,numQuestions,questions);

        
        if (!title ||questions.length !== Number(numQuestions)) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        Quiz.createQuiz(title, numQuestions, (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            const quizId = result.insertId;
            let insertedCount = 0;

            questions.forEach(q => {
                Question.addQuestion(quizId, q.questionText, q.optionA, q.optionB, q.optionC, q.optionD, q.correctAnswer, (err) => {
                    if (err) return res.status(500).json({ message: "Error adding question", error: err });

                    insertedCount++;
                    if (insertedCount === numQuestions) {
                        res.status(201).json({ message: "Quiz created successfully!", quizId });
                    }
                });
            });
        });
    },
    // Get all quizzes
    getAllQuizzes: (req, res) => {
        Quiz.getAllQuizzes((err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            res.status(200).json(results);
        });
    },

    // Get a quiz with its questions
    getQuizWithQuestions: (req, res) => {
        const { quizId } = req.params;

        Quiz.getQuizById(quizId, (err, quizResult) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            if (quizResult.length === 0) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            Question.getQuestionsByQuizId(quizId, (err, questionResults) => {
                if (err) return res.status(500).json({ message: "Database error", error: err });

                res.status(200).json({
                    quiz: quizResult[0],
                    questions: questionResults
                });
            });
        });
    }
};

module.exports = quizController;
