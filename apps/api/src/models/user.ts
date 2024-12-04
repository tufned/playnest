import mongoose from 'mongoose';
import { IUser } from '../types/models/user.interface.js';

const userSchema = new mongoose.Schema<IUser>({
  nickname: {
    type: String,
    required: true,
    minLength: 2
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    validate: {
      validator: (val: string) => val.includes('@'),
      message: 'Email must contain "@" symbol'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user'
  },
  lastChangedAt: {
    type: Date,
    default: () => Date.now()
  }
});

const User = mongoose.model('User', userSchema);

export default User;