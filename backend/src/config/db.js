import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return mongoose.connection;
  const uri = env.mongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  isConnected = true;
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
  return mongoose.connection;
}

export function dbState() {
  // 0=disconnected,1=connected,2=connecting,3=disconnecting,99=uninitialized
  return mongoose.connection.readyState;
}
