const { Schema, model } = require('mongoose');

const otpSchema = new Schema({
  mobile: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = model('Otp', otpSchema);
