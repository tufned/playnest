import { Request, Response } from "express";
import { success } from "../utils/responses.js";
import AuthService from "../services/AuthService.js";
import { authConfig, COOKIE_OPTIONS } from "../constants/auth.js";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";
import UserValidator from "../validations/UserValidator.js";

class AuthController {
  private readonly authService: AuthService;
  private readonly userValidator: UserValidator;

  constructor() {
    this.authService = new AuthService();
    this.userValidator = new UserValidator();
  }

  refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw createError(401, errors.refreshTokenNotRetrieved);

    const tokens = await this.authService.refreshAccessToken(res, refreshToken);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(200).json(success({ accessToken: tokens.accessToken }));
  };

  signup = async (req: Request, res: Response) => {
    const user = this.userValidator.parseSignupDTO(req.body);
    const tokens = await this.authService.signup(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(201).json(success({ accessToken: tokens.accessToken }));
  };

  login = async (req: Request, res: Response) => {
    const user = this.userValidator.parseLoginDTO(req.body);
    const tokens = await this.authService.login(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.status(200).json(success({ accessToken: tokens.accessToken }));
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie(authConfig.REFRESH_TOKEN);
    res.status(200).json(success());
  };
}

export default new AuthController();
