import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'src/pages/main/index.html'),
        header: resolve(__dirname, 'src/pages/header/index.html'),
        footer: resolve(__dirname, 'src/pages/footer/index.html'),
        landing: resolve(__dirname, 'src/pages/landing/index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        signup: resolve(__dirname, 'src/pages/signup/index.html'),
      },
    },
  },
});
