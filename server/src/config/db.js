import mongoose from 'mongoose';
import { config } from './env.js';

let isConnecting = false;

// Defensive query sanitization against NoSQL injection
mongoose.set('sanitizeFilter', true);

export async function connectDB(uri = config.mongodbUri) {
  if (!uri) {
    throw new Error('Cannot connect to MongoDB: URI is not provided');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return mongoose.connection;
  }

  isConnecting = true;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log('[db] Connected to MongoDB');
    return mongoose.connection;
  } catch (err) {
    console.error('[db] Connection error:', err.message);
    throw err;
  } finally {
    isConnecting = false;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('[db] Disconnected from MongoDB');
  }
}
