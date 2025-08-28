import { Router } from 'express';
import { UserController } from './user.controller.js';
import { validate } from '../../middleware/validate.js';
import { RegisterSchema, MeQuerySchema, ListQuerySchema } from './user.validation.js';

const router = Router();

router.post('/', validate({ body: RegisterSchema }), UserController.register);
router.get('/me', validate({ query: MeQuerySchema }), UserController.me);
router.get('/', validate({ query: ListQuerySchema }), UserController.list);

export default router;
