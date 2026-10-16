// Environment configuration skeleton
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  clientOrigins: (process.env.CLIENT_ORIGINS || 'http://localhost:5173').split(','),
};
