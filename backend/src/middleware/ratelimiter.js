const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 10,
  message: {
    error: "Too many URL shortening requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  rateLimiter,
};
