// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    server: {
      maxPayload: 10 * 1024 * 1024,
    },
    build: {
      // Inline assets smaller than 4KB as base64 to save round trips
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          // Keep vendor chunks separate so browsers can cache them independently
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
  },
});