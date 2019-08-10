/* eslint-disable no-console */
/* eslint-disable camelcase */

const redisClient = require('../db/redis-client');

const redisQuestions = {
  getQuestions: (product_id, count, offset) => redisClient.getAsync(`q${product_id}c${count}o${offset}`),
  setQuestions: (product_id, count, offset, result) => redisClient.set(`q${product_id}c${count}o${offset}`, result),
};

const redisAnswers = {
  getAnswers: (question_id, count, offset) => redisClient.getAsync(`a${question_id}c${count}o${offset}`),
  setAnswers: (question_id, count, offset, result) => redisClient.set(`a${question_id}c${count}o${offset}`, result),
};

const redisCommands = { redisFlush: () => redisClient.flushall() };

module.exports = { redisQuestions, redisAnswers, redisCommands };
