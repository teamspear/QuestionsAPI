const db = require("../db");

const questions = {
  getQuestion: id => {
    db.any("SELECT * FROM question WHERE id = $1", [id])
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};

const answers = {
  getAnswers: id => {
    //TODO:
  }
};

module.exports = { questions, answers };
