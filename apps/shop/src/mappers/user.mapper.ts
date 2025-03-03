import {
  UserDTO,
  UserLoginDTO,
  UserSignupDTO,
  UserUpdateDTO,
  UserUpdatePasswordDTO
} from "@playnest/core";
import { UserSignupForm, UserUpdateForm, UserUpdatePasswordForm } from "~/types";

class UserMapper {
  toSignupDTO(rawUser: Partial<UserSignupForm>): UserSignupDTO {
    return {
      nickname: rawUser.nickname ? rawUser.nickname.toString().trim() : "",
      email: rawUser.email ? rawUser.email.toString().trim().toLowerCase() : "",
      password: rawUser.password ? rawUser.password.toString().trim() : ""
    };
  }

  toLoginDTO(rawUser: Partial<UserLoginDTO>): UserLoginDTO {
    return {
      email: rawUser.email ? rawUser.email.toString().trim().toLowerCase() : "",
      password: rawUser.password ? rawUser.password.toString().trim() : ""
    };
  }

  toUpdateDTO(rawUser: UserUpdateForm): UserUpdateDTO {
    return {
      nickname: rawUser.nickname ? rawUser.nickname.toString().trim() : ""
    };
  }

  static toUpdateFormValues(user: UserDTO): UserUpdateForm {
    return {
      email: user.email,
      nickname: user.nickname
    };
  }

  toUserUpdatePasswordDTO(user: UserUpdatePasswordForm): UserUpdatePasswordDTO {
    return {
      password: user.password,
      newPassword: user.newPassword
    };
  }
}

export default UserMapper;
