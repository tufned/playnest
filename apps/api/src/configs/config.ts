import envConfig from "./env.config.js";

const { FRONTEND_URL } = envConfig;

const config = {
  FRONTEND_URL,
  HASH_SALT_ROUNDS: 10,
  CORS_OPTIONS: {
    origin: FRONTEND_URL,
    credentials: true
  }
} as const;

export default config;
