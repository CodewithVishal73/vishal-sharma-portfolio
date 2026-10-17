import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

/**
 * Health check endpoint.
 * Returns only { ok, status, db, uptime, ts } with zero internal leaks.
 * Verifies real Mongoose database connectivity using a live ping when ready.
 */
router.get('/', async (req, res) => {
  let dbStatus = 'disconnected';

  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    try {
      // Execute a real live admin ping against MongoDB
      await mongoose.connection.db.admin().ping();
      dbStatus = 'connected';
    } catch {
      dbStatus = 'disconnected';
    }
  }

  res.status(200).json({
    ok: true,
    status: 'up',
    db: dbStatus,
    uptime: Math.floor(process.uptime()),
    ts: new Date().toISOString(),
  });
});

export default router;
