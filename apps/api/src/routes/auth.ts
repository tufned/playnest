import { Router } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import authController from '../controllers/auth.js';

const router: Router = Router();

router.get('/login', asyncWrapper(authController.login));

export default router;
