import express, { Express } from 'express';
import router from '../routes/index.js';
import errorMiddleware from '../middlewares/error.js';
import cors from 'cors';
import config from '../configs/config.js';

const init = (app: Express) => {
  app.use(cors(config.CORS_OPTIONS));
  app.use(express.json());

  app.use('/', router);

  app.use(errorMiddleware);
};

export default init;
