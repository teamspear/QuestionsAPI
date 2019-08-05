const express = require("express");
const router = express.Router();

router.use(express.json());

const { questions, answers } = require("../models");

// GET Questions
router.get("/:product_id", (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const offset = Math.max(0, (page - 1) * count);

  questions
    .getQuestions(req.params.product_id, count, offset)
    .then(qsWithoutAs => {
      const qsGettingAs = [];
      for (let i = 0; i < qsWithoutAs.length; i++) {
        const question = qsWithoutAs[i];
        qsGettingAs.push(
          questions.getAnswers(question.question_id).then(answers => {
            question.answers = {};
            for (let j = 0; j < answers.length; j++) {
              const answer = answers[j];
              question.answers[answer.id] = answer;
            }
            return question;
          })
        );
      }
      return Promise.all(qsGettingAs);
    })
    .then(qsWithAs => {
      const data = { product_id: req.params.product_id, results: qsWithAs };
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
  const offset = Math.max(0, (page - 1) * count);

  answers
    .getAnswers(req.params.question_id, count, offset)
    .then(results => {
      const data = { question: req.params.question_id, page, count, results };
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST Question
router.post("/:product_id", (req, res) => {
  questions
    .postQuestion(req.params.product_id, req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST Answer
router.post("/:question_id/answers", (req, res) => {
  answers
    .postAnswer(req.params.question_id, req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT Question Helpful
router.put("/question/:question_id/helpful", (req, res) => {
  questions
    .markQuestionHelpful(req.params.question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT Answer Helpful
router.put("/answer/:answer_id/helpful", (req, res) => {
  answers
    .markAnswerHelpful(req.params.answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT Question Report
router.put("/question/:question_id/report", (req, res) => {
  questions
    .reportQuestion(req.params.question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT Answer Report
router.put("/answer/:answer_id/report", (req, res) => {
  answers
    .reportAnswer(req.params.answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
