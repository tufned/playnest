export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSignupDTO {
  nickname: string;
  password: string;
  email: string;
}

export interface UserEntity {
  _id: string;
  nickname: string;
  password: string;
  email: string;
  lastChangedAt: Date;
  createdAt: Date;
}

export interface UserDTO extends Omit<UserEntity, "password" | "_id"> {
  id: UserEntity["_id"];
}

export interface UserJwtPayloadDTO {
  id: UserEntity["_id"];
}
