export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSignupDTO {
  nickname: string;
  password: string;
  email: string;
}

export interface UserDTO {
  id: number;
  nickname: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserJwtPayloadDTO {
  id: number;
}
