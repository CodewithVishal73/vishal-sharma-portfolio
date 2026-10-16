// Central error handler middleware skeleton
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'An unexpected error occurred',
    },
  });
};
