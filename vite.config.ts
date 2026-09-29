/// <reference types="vitest/config" />
import type {} from 'vite-react-ssg'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    // page.html instead of page/index.html: GitHub Pages serves /page without a trailing-slash redirect.
    dirStyle: 'flat',
    formatting: 'none',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
  },
})
