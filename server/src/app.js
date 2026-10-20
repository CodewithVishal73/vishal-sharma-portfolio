import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env.js';
import healthRoutes from './routes/health.js';
import contactRoutes from './routes/contact.js';
import cvRoutes from './routes/cv.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Disable X-Powered-By header
app.disable('x-powered-by');

// Trust reverse proxy for Render deployment
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS configuration from CLIENT_ORIGINS
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g., server-to-server, curl without origin)
    if (!origin) return callback(null, true);

    if (config.clientOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// JSON body parser with strict 10kb limit
app.use(express.json({ limit: '10kb' }));

// Root redirect → live portfolio
app.get('/', (req, res) => {
  res.redirect(301, 'https://vishalsharma1.netlify.app');
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    ok: true,
    name: 'Vishal Sharma – Portfolio API',
    version: '1.0.0',
    endpoints: [
      'GET  /api/health',
      'POST /api/contact',
      'GET  /api/cv/pdf',
      'GET  /api/cv/docx',
    ],
    portfolio: 'https://vishalsharma1.netlify.app',
  });
});

// API routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cv', cvRoutes);

// Catch-all JSON 404 for any unhandled routes
app.use(notFoundHandler);

// Central JSON error handler
app.use(errorHandler);

export default app;
