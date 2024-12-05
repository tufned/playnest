import { IUser } from '@playnest/utils';
import { checkFieldsExistence } from '../utils/requestValidations.js';
import { hashString } from '../lib/bcrypt.js';

class AuthMapper {
  async mapSignupData(rawUser: IUser): Promise<IUser> {
    checkFieldsExistence(rawUser, ['nickname', 'email', 'password']);

    const hashedPassword = await hashString(rawUser.password.toString().trim());

    return {
      nickname: rawUser.nickname.toString().trim(),
      email: rawUser.email.toString().trim(),
      password: hashedPassword
    };
  }
}

export default AuthMapper;
