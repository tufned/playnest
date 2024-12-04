import { Router } from 'express';
import authRouter from '../routes/auth.js';

const router: Router = Router();

router.use('/auth', authRouter);

export default router;
