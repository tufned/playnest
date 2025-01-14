import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'node:path';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@playnest/utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  }
});
