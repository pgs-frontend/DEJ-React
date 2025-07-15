import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  css: {
    extract: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    },
  },
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  },
  server: {
    port: 4435,
    open: true,
    host: true,
  },
  preview: {
    port: 4435,
    open: true,
    host: true,
  },
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss()
  ],
  // base: '/dej',

})
