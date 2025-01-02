import { IUserSignup, IUserLogin } from '@playnest/utils';
import { createHash } from '../lib/bcrypt.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';

class AuthMapper {
  async mapRequestSignupData(rawUser: Partial<IUserSignup>): Promise<IUserSignup> {
    if (!rawUser?.nickname || !rawUser?.email || !rawUser?.password)
      throw createError(406, errors.fieldsAreRequired(['псевдонім', 'email', 'пароль']));

    const hashedPassword = await createHash(rawUser.password.toString().trim());

    return {
      nickname: rawUser.nickname.toString().trim(),
      email: rawUser.email.toString().trim().toLowerCase(),
      password: hashedPassword
    };
  }

  async mapRequestLoginData(rawUser: Partial<IUserLogin>): Promise<IUserLogin> {
    const { email, password } = rawUser;
    return {
      email: email ? email.toString().trim().toLowerCase() : '',
      password: password ? password.toString().trim() : ''
    };
  }
}

export default AuthMapper;
