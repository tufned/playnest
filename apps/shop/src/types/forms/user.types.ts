import { UserSignupDTO, UserUpdateDTO, UserUpdatePasswordDTO } from "@playnest/core";

export interface UserSignupForm extends UserSignupDTO {
  passwordConfirm: string;
}

export interface UserUpdateForm extends UserUpdateDTO {
  email: string;
}

export interface UserUpdatePasswordForm extends UserUpdatePasswordDTO {
  newPasswordConfirm: string;
}
