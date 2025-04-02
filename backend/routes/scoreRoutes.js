const express = require("express");
const scoreController = require("../controllers/ScoreController");

const {authMiddleWare}=require("../middleware/authMiddleware")
const router = express.Router();

router.post("/store", authMiddleWare,scoreController.storeScore);
// router.get("/user/:userId",authMiddleWare, scoreController.getUserScores);

module.exports = router;
