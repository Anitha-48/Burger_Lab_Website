import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Burger_Lab_Website/',
  plugins: [react()],
});
