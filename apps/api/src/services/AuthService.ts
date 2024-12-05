import { IUser } from '@playnest/utils';
import UserService from './UserService.js';

class AuthService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signup(user: IUser) {
    // TODO: generate jwt token

    return this.userService.createUser(user);
  }
}

export default AuthService;
