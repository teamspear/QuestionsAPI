const db = require("../db");

const questions = {
  getQuestion: id => {
    const query = `
    SELECT id as question_id, body as question_body, date_written as question_date,
    asker_name, helpful as question_helpfulness
    FROM question WHERE product_id = $1 and reported = $2
    `;

    return db.any(query, [id, "false"]);
  }
};

const answers = {
  getAnswers: id => {
    //TODO:
  }
};

module.exports = { questions, answers };
