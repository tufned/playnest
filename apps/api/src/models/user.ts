import mongoose from 'mongoose';
import { UserModel } from '@playnest/utils';
import { authConfig } from '@playnest/utils';

// TODO: add error messages and move existing ones to a separate file
//  and translate to ukrainian

const userSchema = new mongoose.Schema<UserModel>({
  nickname: {
    type: String,
    required: true,
    unique: true,
    minLength: authConfig.nickname.minLength,
    maxLength: authConfig.nickname.maxLength
  },
  password: {
    type: String,
    required: true,
    minLength: authConfig.password.minLength,
    maxLength: authConfig.password.maxLength
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: authConfig.email.minLength,
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
