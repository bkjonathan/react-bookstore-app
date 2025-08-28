import { BookRepository } from './book.repository.js';

export const BookService = {
  async create({ title, caption, image, rating, userId }) {
    const created = await BookRepository.create({ title, caption, image, rating, user: userId });
    return created;
  },

  async list({ page, limit }) {
    return BookRepository.list({ page, limit });
  },

  async listMine({ userId, page, limit }) {
    return BookRepository.listByUser(userId, { page, limit });
  },

  async getById(id) {
    const book = await BookRepository.findById(id);
    if (!book) {
      const err = new Error('Book not found');
      err.status = 404;
      throw err;
    }
    return book;
  },

  async updateOwned({ id, userId, data }) {
    const updated = await BookRepository.updateByIdOwned(id, userId, data);
    if (!updated) {
      const err = new Error('Book not found or not owned by user');
      err.status = 404;
      throw err;
    }
    return updated;
  },

  async deleteOwned({ id, userId }) {
    const deleted = await BookRepository.deleteByIdOwned(id, userId);
    if (!deleted) {
      const err = new Error('Book not found or not owned by user');
      err.status = 404;
      throw err;
    }
    return { success: true };
  },
};
