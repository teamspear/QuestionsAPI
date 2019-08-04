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

  postQuestion: (product_id, reqBody) => {
    const query = `
    INSERT INTO question (product_id, body, asker_name, asker_email)
    VALUES ($1, $2, $3, $4) RETURNING id
    `;

    return db.any(query, [
      product_id,
      reqBody.body,
      reqBody.name,
      reqBody.email
    ]);
  },

  markQuestionHelpful: question_id => {
    const query = `
    UPDATE question
    SET helpful = helpful + 1
    WHERE id = $1
    `;

    return db.any(query, [question_id]);
  },

  reportQuestion: question_id => {
    const query = `
    UPDATE question
    SET reported = true
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
  },

  postAnswer: (question_id, reqBody) => {
    const query = `
    INSERT INTO answer (question_id, body, answerer_name, answerer_email, photos)
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;

    return db.any(query, [
      question_id,
      reqBody.body,
      reqBody.name,
      reqBody.email,
      reqBody.photos
    ]);
  },

  markAnswerHelpful: answer_id => {
    const query = `
    UPDATE answer
    SET helpful = helpful + 1
    WHERE id = $1
    `;

    return db.any(query, [answer_id]);
  },

  reportAnswer: answer_id => {
    const query = `
    UPDATE answer
    SET reported = true
    WHERE id = $1
    `;

    return db.any(query, [answer_id]);
  }
};

module.exports = { questions, answers };
