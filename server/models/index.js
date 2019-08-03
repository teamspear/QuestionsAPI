const db = require("../db");

const questions = {
  getQuestions: product_id => {
    const query = `
    SELECT id as question_id, body as question_body, date_written as question_date,
    asker_name, helpful as question_helpfulness
    FROM question WHERE product_id = $1 and reported = $2
    `;

    return db.any(query, [product_id, "false"]);
  },

  markQuestionHelpful: question_id => {
    const query = `
    UPDATE question
    SET helpful = helpful + 1
    WHERE id = $1
    `;

    return db.any(query, [question_id]);
  }
};

const answers = {
  getAnswers: (question_id, offset, count) => {
    const query = `
    SELECT id as answer_id, body, date_written as date, answerer_name, helpful as helpfulness, photos
    FROM answer WHERE question_id = $1 and reported = $2
    LIMIT $3 OFFSET $4
    `;

    return db.any(query, [question_id, "false", count, offset]);
  }
};

module.exports = { questions, answers };
