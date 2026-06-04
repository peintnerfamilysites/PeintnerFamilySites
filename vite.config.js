import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/PeintnerFamilySites/',
  plugins: [react(), tailwindcss()],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('@emailjs')) return 'email-vendor';
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
          return 'vendor';
        },
      },
    },
  },
});
