import { Router } from 'express';
import Message from '../models/Message.js';
import { validateContact } from '../middleware/validate.js';
import { contactRateLimiter } from '../middleware/rateLimit.js';
import { sendNotificationEmail } from '../utils/mailer.js';

const router = Router();

router.post('/', contactRateLimiter, validateContact, async (req, res, next) => {
  try {
    const { name, email, message, website } = req.validatedBody;

    // Honeypot check: if website is filled, silently return 201 without saving to MongoDB
    if (website && website.trim().length > 0) {
      return res.status(201).json({
        ok: true,
        id: `hp_${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    }

    // Check DB availability before attempting write
    const mongoose = (await import('mongoose')).default;
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        ok: false,
        error: {
          code: 'DB_UNAVAILABLE',
          message: 'Database is temporarily unavailable. Please try again later.',
        },
      });
    }

    const userAgent = (req.headers['user-agent'] || '').slice(0, 300);

    const doc = await Message.create({
      name,
      email,
      message,
      userAgent,
      status: 'new',
    });

    // Optional email notification - failures are logged and never fail the request
    sendNotificationEmail({ name, email, message, id: doc._id.toString() }).catch(() => {});

    return res.status(201).json({
      ok: true,
      id: doc._id.toString(),
      createdAt: doc.createdAt.toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
