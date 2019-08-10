const promise = require('bluebird');
const redis = require('redis');

promise.promisifyAll(redis);

const { redisHOST } = require('../keys');

const redisClient = redis.createClient({
  host: redisHOST,
  port: 6379,
});

module.exports = redisClient;
