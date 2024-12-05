import { IUser } from '@playnest/utils';
import User from '../models/UserModel.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';

class UserService {
  async getUserByEmail(email: string) {
    const user = await User.findOne({ email }).exec();

    if (!user) return null;
    return user;
  }

  async createUser(user: IUser) {
    const duplicatedUser = await this.getUserByEmail(user.email);

    if (duplicatedUser) throw createError(409, errors.alreadyRegistered);

    return await User.create(user);
  }
}

export default UserService;
