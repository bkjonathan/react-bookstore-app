import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UserRepository } from '../modules/user/user.repository.js';

// Authentication middleware: requires Authorization: Bearer <token>
export async function authenticate(req, res, next) {
  try {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (!header || !header.startsWith('Bearer ')) {
      const err = new Error('Authentication required');
      err.status = 401;
      throw err;
    }
    const token = header.slice('Bearer '.length).trim();
    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret());
    } catch (e) {
      const err = new Error('Invalid or expired token');
      err.status = 401;
      throw err;
    }
    const userId = payload?.sub;
    if (!userId) {
      const err = new Error('Invalid token payload');
      err.status = 401;
      throw err;
    }
    const user = await UserRepository.findById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      throw err;
    }
    req.user = user; // user object without password (repository selects -password)
    next();
  } catch (err) {
    next(err);
  }
}
