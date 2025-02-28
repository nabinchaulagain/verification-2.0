import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.ts',
  },
});


