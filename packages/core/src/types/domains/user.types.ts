export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSignupDTO extends UserLoginDTO {
  nickname: string;
}

export interface UserUpdateDTO {
  nickname?: string;
}

export interface UserUpdatePasswordDTO {
  password: string;
  newPassword: string;
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
  nickname: string;
}
