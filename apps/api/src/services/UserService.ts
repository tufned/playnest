import { UserSignupDTO, UserEntity } from "@playnest/shared/types/domains/user.types";
import User from "../models/user.js";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";
import { createHash } from "../lib/bcrypt.js";

class UserService {
  async getUserById(id: string) {
    const user = await User.findById(id).exec();
    if (!user) return null;
    return user;
  }

  async getUserByField(field: Partial<UserEntity>) {
    const user = await User.findOne(field).exec();
    if (!user) return null;
    return user;
  }

  async createUser(user: UserSignupDTO) {
    const duplicatedUserByEmail = await this.getUserByField({ email: user.email });
    const duplicatedUserByNickname = await this.getUserByField({
      nickname: user.nickname
    });

    if (duplicatedUserByEmail) throw createError(409, errors.alreadyRegistered);
    if (duplicatedUserByNickname) throw createError(409, errors.nicknameIsTaken);

    return await User.create(user);
  }

  async replacePasswordWithHash(user: UserSignupDTO): Promise<UserSignupDTO> {
    const hashedPassword = await createHash(user.password);
    return {
      ...user,
      password: hashedPassword
    };
  }
}

export default UserService;
