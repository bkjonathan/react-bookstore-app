import { BookRepository } from './book.repository.js';
import { cloudinary } from '../../config/cloudinary.js';

function isUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

async function uploadImageIfNeeded(image) {
  if (!image) return '';
  if (typeof image !== 'string') return '';
  if (isUrl(image)) return image; // already a URL
  // Accept data URI or local path or temp file path provided by client side
  const res = await cloudinary.uploader.upload(image, { folder: 'bookstore/books' });
  return res.secure_url || res.url;
}

export const BookService = {
  async create({ title, caption, image, rating, userId }) {
    const imageUrl = await uploadImageIfNeeded(image);
    const created = await BookRepository.create({ title, caption, image: imageUrl, rating, user: userId });
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
    const update = { ...data };
    if (Object.prototype.hasOwnProperty.call(update, 'image')) {
      // Only process if client sent image field
      update.image = await uploadImageIfNeeded(update.image);
    }
    const updated = await BookRepository.updateByIdOwned(id, userId, update);
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
