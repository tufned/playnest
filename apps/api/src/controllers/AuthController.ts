import { Request, Response } from 'express';
import { success } from '@playnest/utils';
import AuthMapper from '../mappers/AuthMapper.js';
import AuthService from '../services/AuthService.js';
import { authConfig, COOKIE_OPTIONS } from '../constants/auth.js';
import { createError } from '../utils/errorHelpers.js';
import { errors } from '../constants/errors.js';

class AuthController {
  private readonly authService: AuthService;
  private readonly authMapper: AuthMapper;

  constructor() {
    this.authService = new AuthService();
    this.authMapper = new AuthMapper();
  }

  refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, errors.refreshTokenNotRetrieved);

    const tokens = await this.authService.refreshAccessToken(res, refreshToken);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(200).json(success({ accessToken: tokens.accessToken }));
  };

  signup = async (req: Request, res: Response) => {
    const user = await this.authMapper.mapRequestSignupData(req.body);
    const tokens = await this.authService.signup(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(201).json(success({ accessToken: tokens.accessToken }));
  };

  login = async (req: Request, res: Response) => {
    const user = await this.authMapper.mapRequestLoginData(req.body);
    const tokens = await this.authService.login(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(200).json(success({ accessToken: tokens.accessToken }));
  };
}

export default new AuthController();
