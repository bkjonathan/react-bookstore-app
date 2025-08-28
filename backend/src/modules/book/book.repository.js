import { Book } from './book.model.js';

export const BookRepository = {
  async create(data) {
    const book = new Book(data);
    return book.save();
  },

  async findById(id) {
    return Book.findById(id).lean();
  },

  async list({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Book.countDocuments(),
    ]);
    return { items, total, page, pages: Math.ceil(total / limit) };
  },

  async listByUser(userId, { page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Book.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Book.countDocuments({ user: userId }),
    ]);
    return { items, total, page, pages: Math.ceil(total / limit) };
  },

  async updateByIdOwned(id, userId, update) {
    return Book.findOneAndUpdate({ _id: id, user: userId }, update, { new: true }).lean();
  },

  async deleteByIdOwned(id, userId) {
    return Book.findOneAndDelete({ _id: id, user: userId }).lean();
  },
};
