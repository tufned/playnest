import { UserJwtPayloadDTO, UserDTO } from "@playnest/core/types/domains/user.types";
import { User } from "@prisma/client";

class UserMapper {
  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    };
  }

  toJwtPayload(user: User): UserJwtPayloadDTO {
    return {
      id: user.id
    };
  }
}

export default UserMapper;
