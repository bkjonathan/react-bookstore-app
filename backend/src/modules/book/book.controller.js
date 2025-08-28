import { BookService } from './book.service.js';

export const BookController = {
  async create(req, res, next) {
    try {
      const { title, caption, image, rating } = req.body;
      const userId = req.user._id;
      const book = await BookService.create({ title, caption, image, rating, userId });
      res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await BookService.list({ page, limit });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async myBooks(req, res, next) {
    try {
      const { page, limit } = req.query;
      const userId = req.user._id;
      const result = await BookService.listMine({ userId, page, limit });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await BookService.getById(id);
      res.json(book);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const updated = await BookService.updateOwned({ id, userId, data: req.body });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const result = await BookService.deleteOwned({ id, userId });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
