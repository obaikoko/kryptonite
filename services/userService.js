import User from '../models/userModel.js';
import { v4 } from 'uuid';

const generateApiKey = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    user.apiKey = v4();
    await user.save();
    return user.apiKey;
  }
  return null;
};

export { generateApiKey };
