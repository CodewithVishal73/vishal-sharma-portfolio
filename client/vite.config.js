import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.VITE_SITE_URL = env.VITE_SITE_URL || '';

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
  };
});
