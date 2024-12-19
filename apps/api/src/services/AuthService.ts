import { IUserSignup, IUserLogin } from '@playnest/utils';
import UserService from './UserService.js';
import { compareHash } from '../lib/bcrypt.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';
import TokenService from './TokenService.js';
import UserMapper from '../mappers/UserMapper.js';
import { ITokens } from '../types/auth.js';
import { Response } from 'express';
import { authConfig } from '../constants/auth.js';

class AuthService {
  private readonly userService: UserService;
  private readonly userMapper: UserMapper;
  private readonly tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.userMapper = new UserMapper();
    this.tokenService = new TokenService();
  }

  async refreshAccessToken(res: Response, refreshToken: string): Promise<ITokens> {
    const tokenPayload = this.tokenService.validateRefreshToken(refreshToken);
    if (!tokenPayload) {
      res.clearCookie(authConfig.REFRESH_TOKEN);
      throw createError(400, errors.badRefreshToken);
    }

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
    const userDoc = await this.userService.getUserByField({ email: user.email });
    if (!userDoc) throw createError(404, errors.userDoesNotExist);

    const isValidPassword = await compareHash(user.password, userDoc.password);
    if (!isValidPassword) throw createError(401, errors.incorrectEmailOrPasw);

    const userJwtPayload = this.userMapper.toJwtPayload(userDoc);
    return this.tokenService.generateTokens(userJwtPayload);
  }
}

export default AuthService;
