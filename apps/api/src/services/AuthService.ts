import { UserSignupDTO, UserLoginDTO } from "@playnest/shared/types/domains/user.types";
import UserService from "./UserService.js";
import { compareHash } from "../lib/bcrypt.js";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";
import TokenService from "./TokenService.js";
import { ITokens } from "../types/auth.types.js";
import { Response } from "express";
import { authConfig } from "../constants/auth.js";
import UserMapper from "../mappers/UserMapper.js";
import UserRepository from "../repositories/UserRepository.js";

class AuthService {
  private readonly tokenService: TokenService;
  private readonly userService: UserService;
  private readonly userMapper: UserMapper;
  private readonly userRepository: UserRepository;

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
    this.userMapper = new UserMapper();
    this.userRepository = new UserRepository();
  }

  async refreshAccessToken(res: Response, refreshToken: string): Promise<ITokens> {
    const tokenPayload = this.tokenService.validateRefreshToken(refreshToken);
    if (!tokenPayload) {
      res.clearCookie(authConfig.REFRESH_TOKEN);
      throw createError(400, errors.badRefreshToken);
    }

    const userEntity = await this.userRepository.getById(tokenPayload.id);
    if (!userEntity) throw createError(404, errors.userNotExist);

    const userJwtPayload = this.userMapper.toJwtPayload(userEntity);
    return this.tokenService.generateTokens(userJwtPayload);
  }

  async signup(user: UserSignupDTO): Promise<ITokens> {
    const userWithHashedPasw = await this.userService.replacePasswordWithHash(user);

    const userEntity = await this.userRepository.create(userWithHashedPasw);

    const userJwtPayload = this.userMapper.toJwtPayload(userEntity);
    return this.tokenService.generateTokens(userJwtPayload);
  }

  async login(user: UserLoginDTO): Promise<ITokens> {
    const userEntity = await this.userRepository.getByField({ email: user.email });
    if (!userEntity) throw createError(404, errors.userWithEmailNotExist);

    const isValidPassword = await compareHash(user.password, userEntity.password);
    if (!isValidPassword) throw createError(401, errors.incorrectEmailOrPasw);

    const userJwtPayload = this.userMapper.toJwtPayload(userEntity);
    return this.tokenService.generateTokens(userJwtPayload);
  }
}

export default AuthService;
