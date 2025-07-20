const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.sendOTP = async (req, res, next) => {
  try {
    const { mobile } = req.body;

    let user = await User.findOne({ mobile });

    if (user && user.otpExpires && user.otpExpires > new Date()) {
      return res.status(429).json({
        message: 'You have recently requested an OTP. Please try again after a minute.'
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 60000); 

    await User.findOneAndUpdate(
      { mobile },
      { otp: code, otpExpires: expires },
      { upsert: true, new: true, setDefaultsOnInsert: true } 
    );

    console.log(`OTP for ${mobile} is: ${code}`);

    res.status(200).json({ 
      message: 'OTP sent successfully.'
    });

  } catch (error) {
    next(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { mobile, code } = req.body;

    const user = await User.findOne({
      mobile,
      otp: code,
      otpExpires: { $gt: new Date() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

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
        createdAt: user.createdAt 
      }
    });

  } catch (error) {
    next(error);
  }
};
