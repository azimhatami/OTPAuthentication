const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  limit: 5, 
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
  message: {
    status: 429,
    error: 'Rate limit exceeded',
    message: 'Too many OTP requests have been made. Please wait a moment before trying again.'
  },
});

module.exports = {
  generalLimiter,
};
