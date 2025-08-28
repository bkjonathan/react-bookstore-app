import { Router } from 'express';
import healthRouter from './health.route.js';
import userRouter from '../modules/user/user.routes.js';

const router = Router();

router.use('/healthz', healthRouter);
router.use('/users', userRouter);

export default router;
