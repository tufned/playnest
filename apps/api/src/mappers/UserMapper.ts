import { HydratedDocument } from "mongoose";
import { IUserJwtPayload, IUserResponse, UserModel } from "@playnest/utils";

class UserMapper {
  toResponse(user: HydratedDocument<UserModel>): IUserResponse {
    return {
      id: user._id,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      lastChangedAt: user.lastChangedAt,
      createdAt: user.createdAt
    };
  }

  toJwtPayload(user: HydratedDocument<UserModel>): IUserJwtPayload {
    return {
      id: user._id,
      role: user.role
    };
  }
}

export default UserMapper;
