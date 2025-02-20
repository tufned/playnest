import { UserSignupDTO } from "@playnest/core";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";
import Database from "../lib/db-facade.js";
import { Prisma } from "@prisma/client";

class UserRepository {
  private readonly model = Database.client.user;

  async getById(id: number) {
    return await this.model.findUnique({
      where: { id }
    });
  }

  async getByField(field: Prisma.UserWhereUniqueInput) {
    return await this.model.findUnique({ where: field });
  }

  async create(user: UserSignupDTO) {
    const duplicatedUserByEmail = await this.getByField({ email: user.email });
    const duplicatedUserByNickname = await this.getByField({
      nickname: user.nickname
    });

    if (duplicatedUserByEmail) throw createError(409, errors.alreadyRegistered);
    if (duplicatedUserByNickname) throw createError(409, errors.nicknameIsTaken);

    return await this.model.create({ data: user });
  }
}

export default UserRepository;
