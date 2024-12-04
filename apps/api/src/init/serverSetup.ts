import { Express } from 'express';
import envConfig from '../configs/env.config.js';
import init from './app.js';
import initDatabase from './database.js';

const { SERVER_PORT } = envConfig;

const serverSetup = async (app: Express) => {
  await initDatabase();
  init(app);
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
};

export default serverSetup;
