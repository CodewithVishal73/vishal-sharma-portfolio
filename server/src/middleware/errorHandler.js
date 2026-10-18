import { config } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  // Handle payload too large from express.json limit: "10kb"
  if (err.type === 'entity.too.large' || err.status === 413) {
    return res.status(413).json({
      ok: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request payload exceeds 10kb limit',
      },
    });
  }

  // Handle CORS rejection
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      ok: false,
      error: {
        code: 'CORS_ERROR',
        message: 'Origin not allowed by CORS policy',
      },
    });
  }

  // Handle JSON parse error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      ok: false,
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON payload',
      },
    });
  }

  const isProd = config.nodeEnv === 'production';
  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || (statusCode === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR');
  const message = isProd && statusCode >= 500 ? 'An internal server error occurred' : (err.message || 'An unexpected error occurred');

  const response = {
    ok: false,
    error: {
      code: errorCode,
      message,
    },
  };

  if (err.fields) {
    response.error.fields = err.fields;
  }

  if (config.nodeEnv !== 'production' && err.stack && statusCode === 500) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
