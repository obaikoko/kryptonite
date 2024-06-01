import { generateApiKey } from '../services/userService.js';
import { generateOtp, storeOtp, validateOtp } from '../services/otpService.js';
import { sendOtpEmail } from '../services/emailService.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// @desc Register User
// @route POST /api/auth/register
// @privacy Public
const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // checkes if User Exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }
  // Register new User
  const user = await User.create({ email });
  res.status(200);
  res.json(user);
});

// @desc Send One time Password to User
// @route POST /api/auth/send-otp
// @privacy Public
const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  storeOtp(email, otp);
  await sendOtpEmail(email, otp);
  res.status(200).json({ message: 'OTP sent to email' });
});

// @desc Verify One time Password
// @route POST /api/auth/verify-otp
// @privacy Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const isValid = await validateOtp(email, otp);
  if (isValid) {
    const apiKey = await generateApiKey(email);
    res.status(200).json({ message: 'OTP verified', apiKey });
  } else {
    res.status(400);
    throw new Error('Invalid OTP');
  }
});

export { register, sendOtp, verifyOtp };
