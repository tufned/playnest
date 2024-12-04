export interface IUser {
  _id: string;
  nickname: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
  lastChangedAt: Date;
  createdAt: Date;
}
