import { UserLoginDTO, UserSignupDTO } from "@playnest/shared/types/domains/user.types";
import { zodValidationError } from "../utils/errorHelpers.js";
import UserSignupSchema from "./schemas/user-signup.js";
import UserLoginSchema from "./schemas/user-login.js";

class UserValidator {
  parseSignupDTO(user: unknown): UserSignupDTO {
    try {
      return UserSignupSchema.parse(user);
    } catch (error) {
      console.error(error);
      throw zodValidationError(error);
    }
  }

  parseLoginDTO(user: unknown): UserLoginDTO {
    try {
      return UserLoginSchema.parse(user);
    } catch (error) {
      console.error(error);
      throw zodValidationError(error);
    }
  }
}

export default UserValidator;
