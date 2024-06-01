import mongoose from 'mongoose';
import { v4 } from 'uuid';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    default: v4,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
