const express = require("express");
const router = express.Router();

const { questions, answers } = require("../models");

// GET Questions
router.get("/:product_id", (req, res) => {
  questions
    .getQuestion(req.params.product_id)
    .then(results => {
      const data = { product_id: req.params.product_id, results };
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
