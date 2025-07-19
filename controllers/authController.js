const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Otp = require('../models/Otp');


exports.sendOTP = async (req, res, next) => {
  try {
    const { mobile } = req.body;

    const existingOtp = await Otp.findOne({ mobile });

    if (existingOtp) {
      return res.status(429).json({
        message: 'You have recently requested ant OTP. Please try again after a minute.'
      });
    }
    
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({ mobile, code });

    console.log(`OTP for ${mobile} is: ${code}`);
    
    res.status(201).json({
      message: 'OTP generated and sent.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { mobile, code } = req.body;

    const oneMinAgo = new Date(Date.now() - 60000);
    
    const otpEntry = await Otp.findOne({ 
      mobile, 
      code, 
      createdAt: { $gt: oneMinAgo } 
    });

    if (!otpEntry) {
      return res.status(400).json({
        message: 'Invalid or expired OTP'
      });
    }

    // Find user or create a new one
    let user = await User.findOne({ mobile });
    
    if (!user) {
      user = await User.create({ mobile });
    }

    // Delete the used OTP
    await Otp.deleteOne({ _id: otpEntry._id });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        _id: user._id,
        mobile: user.mobile,
        createAt: user.createAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};
