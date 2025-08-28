import { Router } from 'express';
import { UserController } from '../modules/user/user.controller.js';
import { validate } from '../middleware/validate.js';
import { RegisterSchema, LoginSchema } from '../modules/user/user.validation.js';

const router = Router();

// POST /api/auth/register
router.post('/register', validate({ body: RegisterSchema }), UserController.register);

// POST /api/auth/login
router.post('/login', validate({ body: LoginSchema }), UserController.login);

export default router;
