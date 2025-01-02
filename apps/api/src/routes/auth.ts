import { Router } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import AuthController from '../controllers/AuthController.js';

const router: Router = Router();

router.post('/login', asyncWrapper(AuthController.login));
router.post('/signup', asyncWrapper(AuthController.signup));
router.get('/refresh', asyncWrapper(AuthController.refreshAccessToken));
router.get('/logout', asyncWrapper(AuthController.logout));

export default router;
