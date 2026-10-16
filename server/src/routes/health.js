import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    ok: true,
    status: 'up',
    db: isDbConnected ? 'connected' : 'disconnected',
    uptime: Math.floor(process.uptime()),
    ts: new Date().toISOString(),
  });
});

export default router;
