import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/elevator-saga/',
  root: 'public',
  build: {
    outDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
      },
      output: {
        entryFileNames: 'scripts/bundle.js',
        assetFileNames: 'styles/[name][extname]',
      },
    },
  },
  server: {
    open: '/index.html',
    port: 8080,
  },
});
