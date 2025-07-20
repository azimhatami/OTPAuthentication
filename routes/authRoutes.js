const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { generalLimiter } = require('../middlewares/rateLimiter');
const { validateSendOtp, validateVerifyOtp } = require('../validators/authValidator');
const { handleValidationErrors } = require('../middlewares/validationHandler');



// Route to request an OTP
router.post(
  '/send-otp', 
  generalLimiter, 
  validateSendOtp,
  handleValidationErrors,
  authController.sendOTP
);

// Route to verify OTP and login
router.post(
  '/verify-otp', 
  validateVerifyOtp,
  handleValidationErrors,
  authController.verifyOTP
);

module.exports = router
