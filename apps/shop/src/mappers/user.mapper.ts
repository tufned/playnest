import { UserLoginDTO, UserSignupDTO } from "@playnest/core/types/domains/user.types";
import { UserSignupForm } from "~/types";

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
}

export default UserMapper;
