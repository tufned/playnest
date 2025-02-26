import { UserSignupDTO, UserUpdateDTO, UserUpdatePasswordDTO } from "@playnest/core";
import { compareHash, createHash } from "../lib/bcrypt.js";
import UserRepository from "../repositories/UserRepository.js";
import { Prisma } from "@prisma/client";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";

type ID = string | number | undefined;

class UserService {
  constructor(private readonly userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  private async replacePasswordWithHash(user: UserSignupDTO): Promise<UserSignupDTO> {
    const hashedPassword = await createHash(user.password);
    return {
      ...user,
      password: hashedPassword
    };
  }

  async create(user: UserSignupDTO) {
    const duplicatedUserByEmail = await this.getByField({ email: user.email });
    const duplicatedUserByNickname = await this.getByField({
      nickname: user.nickname
    });

    if (duplicatedUserByEmail) throw createError(409, errors.alreadyRegistered);
    if (duplicatedUserByNickname) throw createError(409, errors.nicknameIsTaken);

    const userWithHashedPasw = await this.replacePasswordWithHash(user);
    return await this.userRepository.create(userWithHashedPasw);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getByField(field: Prisma.UserWhereUniqueInput) {
    return await this.userRepository.getByField(field);
  }

  async getById(id: ID) {
    if (!id) throw createError(409, errors.paramsNotReceived(["id"]));
    const user = await this.getByField({ id: Number(id) });
    if (!user) throw createError(404, errors.userNotExist);
    return user;
  }

  async update(id: ID, user: UserUpdateDTO) {
    if (!id) throw createError(409, errors.paramsNotReceived(["id"]));
    const foundUser = await this.getById(Number(id));
    if (!foundUser) throw createError(404, errors.userNotExist);
    return await this.userRepository.update(Number(id), user);
  }

  async updatePassword(id: ID, passwords: UserUpdatePasswordDTO) {
    if (!id) throw createError(409, errors.paramsNotReceived(["id"]));
    const foundUser = await this.getById(Number(id));
    if (!foundUser) throw createError(404, errors.userNotExist);

    const { password, newPassword } = passwords;
    const isValidPasw = await compareHash(password, foundUser.password);
    if (!isValidPasw) throw createError(401, errors.invalidPassword);

    const newHashedPassword = await createHash(newPassword);
    return await this.userRepository.update(Number(id), {
      password: newHashedPassword
    });
  }
}

export default UserService;
