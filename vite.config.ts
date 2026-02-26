import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://apibos.yemimainternational.com',
        changeOrigin: true,
      },
      '/storage': {
        target: 'https://apibos.yemimainternational.com',
        changeOrigin: true,
      },
    },
  },
  appType: 'spa',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
