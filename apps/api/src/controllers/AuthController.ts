import { Request, Response } from "express";
import AuthService from "../services/AuthService.js";
import { authConfig, COOKIE_OPTIONS } from "../constants/auth.js";
import { createError } from "../utils/errorHelpers.js";
import { errors } from "../constants/errors.js";
import UserValidator from "../validations/UserValidator.js";
import ResponseMapper from "../mappers/ResponseMapper.js";
import { ITokens } from "../types/auth.types.js";

class AuthController {
  constructor(
    private readonly authService = new AuthService(),
    private readonly userValidator = new UserValidator(),
    private readonly responseMapper = new ResponseMapper()
  ) {
    this.authService = authService;
    this.userValidator = userValidator;
    this.responseMapper = responseMapper;
  }

  private prepareResponse(tokens: ITokens) {
    return this.responseMapper.toSuccess({ accessToken: tokens.accessToken });
  }

  refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.clearCookie(authConfig.ACCESS_TOKEN);
      throw createError(401, errors.refreshTokenNotRetrieved);
    }

    const tokens = await this.authService.refreshAccessToken(res, refreshToken);

    res.cookie(authConfig.ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS);
    res.status(200).json(this.prepareResponse(tokens));
  };

  signup = async (req: Request, res: Response) => {
    const user = this.userValidator.parseSignupDTO(req.body);
    const tokens = await this.authService.signup(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.cookie(authConfig.ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS);
    res.status(201).json(this.prepareResponse(tokens));
  };

  login = async (req: Request, res: Response) => {
    const user = this.userValidator.parseLoginDTO(req.body);
    const tokens = await this.authService.login(user);

    res.cookie(authConfig.REFRESH_TOKEN, tokens.refreshToken, COOKIE_OPTIONS);
    res.cookie(authConfig.ACCESS_TOKEN, tokens.accessToken, COOKIE_OPTIONS);
    res.status(200).json(this.prepareResponse(tokens));
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie(authConfig.REFRESH_TOKEN);
    res.clearCookie(authConfig.ACCESS_TOKEN);
    res.status(200).json(this.responseMapper.toSuccess());
  };
}

export default new AuthController();
