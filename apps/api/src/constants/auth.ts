import envConfig from "../configs/env.config.js";

const oneDayInMs = 86400000;

export const authConfig = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken"
} as const;

export const COOKIE_OPTIONS = {
  maxAge: oneDayInMs,
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: envConfig.COOKIE_DOMAIN
} as const;
