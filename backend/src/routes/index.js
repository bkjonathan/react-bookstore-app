import { Router } from 'express';
import healthRouter from './health.route.js';
import authRouter from './auth.route.js';
import userRouter from '../modules/user/user.routes.js';
import bookRouter from '../modules/book/book.routes.js';

const router = Router();

router.use('/healthz', healthRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/books', bookRouter);

export default router;
