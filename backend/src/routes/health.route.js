import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState; // 0..3
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    dbState,
  });
});

export default router;
