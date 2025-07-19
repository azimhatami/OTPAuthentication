const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Route to request an OTP
router.post('/send-otp', authController.sendOTP);

// Route to verify OTP and login
router.post('/verify-otp', authController.verifyOTP);

module.exports = router
