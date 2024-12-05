export interface IUser {
  nickname: string;
  password: string;
  email: string;
}

export interface UserModel extends IUser {
  _id: string;
  role?: 'user' | 'admin';
  lastChangedAt: Date;
  createdAt: Date;
}

export interface IUserResponse extends Omit<UserModel, 'password' | '_id'> {
  id: UserModel['_id'];
}
