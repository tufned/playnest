const envConfig = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DB_URI: process.env.DB_URI,
  DB_PASW: process.env.DB_PASW,
  DB_NAME: process.env.DB_NAME
} as const;

export default envConfig;
