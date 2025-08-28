import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

export function configureCloudinary() {
  const cloud_name = env.cloudName();
  const api_key = env.cloudKey();
  const api_secret = env.cloudSecret();
  if (cloud_name && api_key && api_secret) {
    cloudinary.config({ cloud_name, api_key, api_secret });
  }
}

export { cloudinary };
