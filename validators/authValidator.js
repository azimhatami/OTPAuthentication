const { body } = require('express-validator');

// Validation rules for sending OTP
exports.validateSendOtp = [
  body('mobile')
    .notEmpty().withMessage('Mobile number is required.')
    .isString().withMessage('Mobile number must be a string.')
    .matches(/^09\d{9}$/).withMessage('Invalid mobile number format.')
];

// Validation rules for verifying OTP
exports.validateVerifyOtp = [
  body('mobile')
    .notEmpty().withMessage('Mobile number is required.')
    .isString().withMessage('Mobile number must be a string.')
    .matches(/^09\d{9}$/).withMessage('Invalid mobile number format.'),

  body('code')
    .notEmpty().withMessage('Verification code is required.')
    .isString().withMessage('Verification code must be a string.')
    .isLength({ min: 6, max: 6 }).withMessage('Verification code must be 6 digits.')
];
