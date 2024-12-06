import { IUserSignup, IUserLogin } from '@playnest/utils';
import UserService from './UserService.js';
import { compareHash } from '../lib/bcrypt.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';
import TokenService from './TokenService.js';
import UserMapper from '../mappers/UserMapper.js';
import { ITokens } from '../types/auth.js';

class AuthService {
  private readonly userService: UserService;
  private readonly userMapper: UserMapper;
  private readonly tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.userMapper = new UserMapper();
    this.tokenService = new TokenService();
  }

  async refreshAccessToken(refreshToken: string): Promise<ITokens> {
    const tokenPayload = this.tokenService.validateRefreshToken(refreshToken);
    if (!tokenPayload) throw createError(400, errors.badRefreshToken);

    const userDoc = await this.userService.getUserById(tokenPayload.id);

    const userJwtPayload = this.userMapper.toJwtPayload(userDoc!);
    return this.tokenService.generateTokens(userJwtPayload);
  }

  async signup(user: IUserSignup): Promise<ITokens> {
    const userDoc = await this.userService.createUser(user);

    const userJwtPayload = this.userMapper.toJwtPayload(userDoc);
    return this.tokenService.generateTokens(userJwtPayload);
  }

  async login(user: IUserLogin): Promise<ITokens> {
    const userDoc = await this.userService.getUserByEmail(user.email);
    if (!userDoc) throw createError(404, errors.userDoesNotExist);

    const isValidPassword = await compareHash(user.password, userDoc.password);
    if (!isValidPassword) throw createError(401, errors.incorrectEmailOrPasw);

    const userJwtPayload = this.userMapper.toJwtPayload(userDoc);
    return this.tokenService.generateTokens(userJwtPayload);
  }
}

export default AuthService;
