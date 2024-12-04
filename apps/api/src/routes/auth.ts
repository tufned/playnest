import { Router } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import authController from '../controllers/auth.js';

const router: Router = Router();

router.post('/login', asyncWrapper(authController.login));
router.post('/signup', asyncWrapper(authController.login));

export default router;
