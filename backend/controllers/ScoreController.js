const Score = require("../models/scoreModel");

exports.storeScore = (req, res) => {
    const { userId, testId, score } = req.body;
    // console.log( userId, testId, score )
    if (!userId || !testId || score === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    Score.addScore(userId, testId, score, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Score stored successfully", result });
    });
};

exports.getUserScores = (req, res) => {
    const { userId } = req.params;

    Score.getScoresByUser(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ scores: results });
    });
};
