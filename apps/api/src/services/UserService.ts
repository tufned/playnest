import { IUserSignup } from '@playnest/utils';
import User from '../models/user.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';

class UserService {
  async getUserById(id: string) {
    const user = await User.findById(id).exec();
    if (!user) return null;
    return user;
  }

  async getUserByField(field: string) {
    const user = await User.findOne({ field }).exec();
    if (!user) return null;
    return user;
  }

  async createUser(user: IUserSignup) {
    const duplicatedUserNyEmail = await this.getUserByField(user.email);
    const duplicatedUserNyNickname = await this.getUserByField(user.nickname);

    if (duplicatedUserNyEmail) throw createError(409, errors.alreadyRegistered);
    if (duplicatedUserNyNickname) throw createError(409, errors.nicknameIsTaken);

    return await User.create(user);
  }
}

export default UserService;
