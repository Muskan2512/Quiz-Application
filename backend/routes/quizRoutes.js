const express = require("express");
const quizController = require("../controllers/quizController");
const router = express.Router();
const {authMiddleWare}=require("../middleware/authMiddleware")

// Create Quiz
router.post("/create",quizController.createQuiz);

// Get all quizzes
router.get("/all",authMiddleWare,quizController.getAllQuizzes);

// Get a specific quiz with questions
router.get("/:quizId", quizController.getQuizWithQuestions);

module.exports = router;
