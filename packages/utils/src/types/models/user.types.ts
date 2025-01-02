export interface IUserSignup {
  nickname: string;
  password: string;
  email: string;
}

export interface UserModel extends IUserSignup {
  _id: string;
  role: 'user' | 'admin';
  lastChangedAt: Date;
  createdAt: Date;
}

export interface IUserResponse extends Omit<UserModel, 'password' | '_id'> {
  id: UserModel['_id'];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserJwtPayload {
  id: UserModel['_id'];
  role: UserModel['role'];
}
