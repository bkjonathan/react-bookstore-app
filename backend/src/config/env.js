import dotenv from 'dotenv';

let loaded = false;

export function loadEnv() {
  if (loaded) return;
  dotenv.config();
  loaded = true;
}

export function getEnv(key, fallback = undefined) {
  if (!loaded) loadEnv();
  const val = process.env[key];
  if (val === undefined) return fallback;
  return val;
}

export const env = {
  node: () => getEnv('NODE_ENV', 'production'),
  port: () => Number(getEnv('PORT', '4000')),
  mongoUri: () => getEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/bookstore?replicaSet=rs0&authSource=admin'),
  cloudName: () => getEnv('CLOUDINARY_CLOUD_NAME', ''),
  cloudKey: () => getEnv('CLOUDINARY_API_KEY', ''),
  cloudSecret: () => getEnv('CLOUDINARY_API_SECRET', ''),
  jwtSecret: () => getEnv('JWT_SECRET', 'change_me'),
};
