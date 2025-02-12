import jwt from "jsonwebtoken";
import envConfig from "../configs/env.config.js";
import { createError } from "../utils/errorHelpers.js";
import { UserJwtPayloadDTO } from "@playnest/shared/types/domains/user.types";
import { ITokens } from "../types/auth.js";

class TokenService {
  generateTokens(payload: UserJwtPayloadDTO): ITokens {
    try {
      const accessToken = jwt.sign(payload, envConfig.JWT_ACCESS_SECRET, {
        expiresIn: envConfig.JWT_ACCESS_EXPIRES_IN
      });
      const refreshToken = jwt.sign(payload, envConfig.JWT_REFRESH_SECRET, {
        expiresIn: envConfig.JWT_REFRESH_EXPIRES_IN
      });

      return {
        accessToken,
        refreshToken
      };
    } catch (err) {
      throw createError(500, (err as Error).message);
    }
  }

  private validateToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret) as UserJwtPayloadDTO;
    } catch (err) {
      return null;
    }
  }

  validateAccessToken = (token: string) => {
    return this.validateToken(token, envConfig.JWT_ACCESS_SECRET);
  };

  validateRefreshToken = (token: string) => {
    return this.validateToken(token, envConfig.JWT_REFRESH_SECRET);
  };
}

export default TokenService;
