import { UserSignupDTO } from "@playnest/shared/types/domains/user.types";
import { createHash } from "../lib/bcrypt.js";

class UserService {
  async replacePasswordWithHash(user: UserSignupDTO): Promise<UserSignupDTO> {
    const hashedPassword = await createHash(user.password);
    return {
      ...user,
      password: hashedPassword
    };
  }
}

export default UserService;
