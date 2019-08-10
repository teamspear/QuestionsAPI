const promise = require('bluebird');
const redis = require('redis');

promise.promisifyAll(redis);

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379,
});

module.exports = redisClient;
