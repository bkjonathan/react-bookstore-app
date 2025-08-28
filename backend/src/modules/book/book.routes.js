import { Router } from 'express';
import { BookController } from './book.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/auth.js';
import { CreateBookSchema, UpdateBookSchema, ListQuerySchema, IdParamSchema } from './book.validation.js';

const router = Router();

// All book routes require authentication
router.use(authenticate);

// GET /api/books
router.get('/', validate({ query: ListQuerySchema }), BookController.list);

// GET /api/books/mine
router.get('/mine', validate({ query: ListQuerySchema }), BookController.myBooks);

// POST /api/books
router.post('/', validate({ body: CreateBookSchema }), BookController.create);

// GET /api/books/:id
router.get('/:id', validate({ params: IdParamSchema }), BookController.getById);

// PATCH /api/books/:id
router.patch('/:id', validate({ params: IdParamSchema, body: UpdateBookSchema }), BookController.update);

// DELETE /api/books/:id
router.delete('/:id', validate({ params: IdParamSchema }), BookController.remove);

export default router;
