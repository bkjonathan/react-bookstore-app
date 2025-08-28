import { User } from './user.model.js';

export const UserRepository = {
  async create(data) {
    const user = new User(data);
    return user.save();
  },

  async findById(id) {
    return User.findById(id).select('-password').lean();
  },

  async findByEmail(email) {
    return User.findOne({ email });
  },

  async list({ limit = 20, page = 1 } = {}) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit).lean(),
      User.countDocuments(),
    ]);
    return { items, total, page, pages: Math.ceil(total / limit) };
  },
};
