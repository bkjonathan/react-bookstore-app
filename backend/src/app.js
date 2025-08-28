import express from 'express';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/error.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Root
app.get('/', (req, res) => {
  res.json({ name: 'bookstore-backend', version: '1.0.0' });
});

// API routes
app.use('/api', routes);

// Health check at top-level for simplicity too
app.get('/healthz', (req, res) => {
  // This is a simple fallback. The main health is /api/healthz with DB info
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

export { app };
