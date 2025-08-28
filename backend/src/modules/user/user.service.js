import jwt from 'jsonwebtoken';
import { UserRepository } from './user.repository.js';
import { env } from '../../config/env.js';

export const UserService = {
  async register({ name, email, password }) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }
    const created = await UserRepository.create({ name, email, password });
    const { token } = this.issueToken(created._id, email);
    return {
      user: { _id: created._id, name: created.name, email: created.email, profileImage: created.profileImage },
      token,
    };
  },

  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    // Avoid revealing which field is wrong
    const invalidErr = new Error('Invalid email or password');
    invalidErr.status = 401;
    if (!user) {
      throw invalidErr;
    }
    const ok = await user.comparePassword(password);
    if (!ok) {
      throw invalidErr;
    }
    const { token } = this.issueToken(user._id, user.email);
    return { user: { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage }, token };
  },

  async getProfile(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    return user;
  },

  issueToken(id, email) {
    const payload = { sub: String(id), email };
    const token = jwt.sign(payload, env.jwtSecret(), { expiresIn: '7d' });
    return { token };
  },

  async list(params) {
    return UserRepository.list(params);
  },
};
