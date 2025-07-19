const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  mobile: { type: String, unique: true, required: true }
}, { timestamps: true });

module.exports = model('User', userSchema);
