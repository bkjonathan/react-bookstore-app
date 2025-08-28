import http from 'http';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { loadEnv } from './config/env.js';
import { configureCloudinary } from './config/cloudinary.js';
import './jobs/index.js';

loadEnv();

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    configureCloudinary();
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });

    const shutdown = (signal) => {
      // eslint-disable-next-line no-console
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        // eslint-disable-next-line no-console
        console.log('HTTP server closed');
        process.exit(0);
      });
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.error('Force exiting after timeout');
        process.exit(1);
      }, 10000);
    };

    ['SIGINT', 'SIGTERM'].forEach((sig) => process.on(sig, () => shutdown(sig)));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
