import {
  UserJwtPayloadDTO,
  UserDTO,
  UserEntity
} from "@playnest/shared/types/domains/user.types";
import { HydratedDocument } from "mongoose";

class UserMapper {
  toDTO(user: HydratedDocument<UserEntity>): UserDTO {
    return {
      id: user._id,
      nickname: user.nickname,
      email: user.email,
      lastChangedAt: user.lastChangedAt,
      createdAt: user.createdAt
    };
  }

  toJwtPayload(user: HydratedDocument<UserEntity>): UserJwtPayloadDTO {
    return {
      id: user._id
    };
  }
}

export default UserMapper;
