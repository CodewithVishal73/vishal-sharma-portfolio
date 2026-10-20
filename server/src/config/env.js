import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Prioritize server/.env relative to this file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Also fallback to process.cwd() .env if present
dotenv.config();


const isTest = process.env.NODE_ENV === 'test';
const skipValidation = process.env.SKIP_ENV_VALIDATION === 'true';

if (!process.env.MONGODB_URI && !isTest && !skipValidation) {
  console.warn('[config] WARNING: MONGODB_URI is not set. Contact form DB persistence will be unavailable.');
}

const clientOriginsRaw = process.env.CLIENT_ORIGINS || '';
const clientOrigins = clientOriginsRaw
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

// Localhost is only permitted when NODE_ENV is not production
if (process.env.NODE_ENV !== 'production') {
  if (!clientOrigins.includes('http://localhost:5173')) {
    clientOrigins.push('http://localhost:5173');
  }
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  clientOrigins,
  smtp: {
    host: process.env.SMTP_HOST || null,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || null,
    pass: process.env.SMTP_PASS || null,
    notifyTo: process.env.NOTIFY_TO || null,
  },
};
