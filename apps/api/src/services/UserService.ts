import { IUserSignup } from '@playnest/utils';
import User from '../models/user.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';

class UserService {
  async getUserById(id: string) {
    const user = await User.findById(id);
    if (!user) return null;
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ email }).exec();
    if (!user) return null;
    return user;
  }

  async createUser(user: IUserSignup) {
    const duplicatedUser = await this.getUserByEmail(user.email);
    if (duplicatedUser) throw createError(409, errors.alreadyRegistered);
    return await User.create(user);
  }
}

export default UserService;
