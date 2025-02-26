import { UserSignupDTO, UserUpdateDTO, UserUpdatePasswordDTO } from "@playnest/core";
import Database from "../lib/db-facade.js";
import { Prisma } from "@prisma/client";

class UserRepository {
  private readonly model = Database.client.user;

  async getAll() {
    return await this.model.findMany();
  }

  async getByField(field: Prisma.UserWhereUniqueInput) {
    return await this.model.findUnique({ where: field });
  }

  async create(user: UserSignupDTO) {
    return await this.model.create({ data: user });
  }

  async update(
    id: number,
    data: UserUpdateDTO | Omit<UserUpdatePasswordDTO, "newPassword">
  ) {
    return await this.model.update({ where: { id }, data });
  }
}

export default UserRepository;
