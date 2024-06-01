import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URI,
    port: 13035,
  },
});

client.on('error', (error) => {
  console.error('Redis client error:', error);
});

client.connect().catch(console.error);

// Generate a 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP with expiration time
const storeOtp = (email, otp, callback) => {
  client.SETEX(email, process.env.OTPEXPIRY, otp);
};

// Validate OTP and delete if valid
const validateOtp = async (email, otp) => {
  const storedOtp = await client.GET(`${email}`);
  if (storedOtp === otp) {
    await client.DEL(`${email}`);
    return true;
  }
  return false;
};

// Handle connection events
client.on('error', (error) => {
  console.error('Redis client error:', error);
});

export { generateOtp, storeOtp, validateOtp };
