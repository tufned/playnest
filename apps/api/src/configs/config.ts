import envConfig from "./env.config.js";

const { FRONTEND_PROTOCOL, FRONTEND_DOMAIN, FRONTEND_PORT } = envConfig;

const FRONTEND_URL = `${FRONTEND_PROTOCOL}://${FRONTEND_DOMAIN}:${FRONTEND_PORT}`;

const config = {
  FRONTEND_URL,
  HASH_SALT_ROUNDS: 10,
  CORS_OPTIONS: {
    origin: FRONTEND_URL,
    credentials: true
  }
} as const;

export default config;
