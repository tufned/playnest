const envConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_URI: process.env.DB_URI,
  DB_PASW: process.env.DB_PASW,
  DB_NAME: process.env.DB_NAME,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || ''
} as const;

export default envConfig;
