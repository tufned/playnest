import {
  UserLoginDTO,
  UserSignupDTO,
  UserUpdateDTO,
  UserUpdatePasswordDTO
} from "@playnest/core";
import UserSignupSchema from "./schemas/user-signup.js";
import UserLoginSchema from "./schemas/user-login.js";
import { validationDecorator } from "../utils/validationDecorator.js";
import UserUpdateSchema from "./schemas/user-update.js";
import UserUpdatePasswordSchema from "./schemas/user-update-password.js";

class UserValidator {
  parseSignupDTO = validationDecorator<UserSignupDTO>((user: unknown) => {
    return UserSignupSchema.parse(user);
  });

  parseLoginDTO = validationDecorator<UserLoginDTO>((user: unknown) => {
    return UserLoginSchema.parse(user);
  });

  parseUpdateDTO = validationDecorator<UserUpdateDTO>((user: unknown) => {
    return UserUpdateSchema.parse(user);
  });

  parseUpdatePasswordDTO = validationDecorator<UserUpdatePasswordDTO>((data: unknown) => {
    return UserUpdatePasswordSchema.parse(data);
  });
}

export default UserValidator;
