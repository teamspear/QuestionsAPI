const express = require("express");
const router = express.Router();

const { questions, answers } = require("../models");

// GET Questions
router.get("/:product_id", (req, res) => {
  questions
    .getQuestions(req.params.product_id)
    .then(results => {
      const data = { product_id: req.params.product_id, results };
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET Answers
router.get("/:question_id/answers", (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const offset = (page - 1) * count;

  answers
    .getAnswers(req.params.question_id, offset, count)
    .then(results => {
      const data = { question: req.params.question_id, page, count, results };
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
