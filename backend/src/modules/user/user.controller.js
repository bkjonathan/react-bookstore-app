import { UserService } from './user.service.js';

export const UserController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await UserService.register({ name, email, password });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login({ email, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async me(req, res, next) {
    try {
      // For demo purposes, accept userId from query (avoid auth middleware here)
      const { userId } = req.query;
      const user = await UserService.getProfile(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await UserService.list({ page: Number(page) || 1, limit: Number(limit) || 20 });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
