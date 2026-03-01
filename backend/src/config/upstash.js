const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');
require('dotenv').config({quiet: true});

// create a ratelimiter that allows 5 requests per 10 second
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(7, '10 s'),
});

module.exports = ratelimit;
