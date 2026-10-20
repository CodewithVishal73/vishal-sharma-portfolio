import app from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

let server = null;

export async function start() {
  try {
    // Attempt DB connection only if URI is configured
    if (config.mongodbUri) {
      try {
        await connectDB();
      } catch (dbErr) {
        console.warn('[server] MongoDB connection failed — continuing without DB:', dbErr.message);
      }
    } else {
      console.warn('[server] MONGODB_URI not set — starting without database connection.');
    }

    server = app.listen(config.port, '0.0.0.0', () => {
      console.log(`[server] Server running on 0.0.0.0:${config.port} (${config.nodeEnv})`);
    });
    return server;
  } catch (err) {
    console.error('[server] Boot failed:', err.message);
    process.exit(1);
  }
}

export async function shutdown(signal = 'SIGTERM') {
  console.log(`[server] Received ${signal}, starting graceful shutdown...`);

  if (server) {
    await new Promise((resolve) => {
      server.close(() => {
        console.log('[server] HTTP server closed');
        resolve();
      });
    });
  }

  try {
    await disconnectDB();
    console.log('[server] Database disconnected. Graceful shutdown complete.');
    process.exit(0);
  } catch (err) {
    console.error('[server] Error during database disconnect:', err.message);
    process.exit(1);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Start server directly if this file is the execution entrypoint
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('index.js') || 
  process.argv[1].endsWith('index')
);

if (isDirectRun) {
  start();
}

export default app;
