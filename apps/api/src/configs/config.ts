import envConfig from './env.config.js';

const config = {
  HASH_SALT_ROUNDS: 10,
  CORS_OPTIONS: {
    origin: envConfig.FRONTEND_URL,
    credentials: true
  }
} as const;

export default config;
