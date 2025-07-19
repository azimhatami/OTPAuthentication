const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.log('MongoDB connection error: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
