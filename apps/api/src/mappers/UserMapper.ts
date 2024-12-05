import { HydratedDocument } from 'mongoose';
import { IUserResponse, UserModel } from '@playnest/utils';

class UserMapper {
  async mapUserDoc(user: HydratedDocument<UserModel>): Promise<IUserResponse> {
    return {
      id: user._id,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      lastChangedAt: user.lastChangedAt,
      createdAt: user.createdAt
    };
  }
}

export default UserMapper;
