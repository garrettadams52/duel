import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  base: '/static/',
  build: {
    outDir: '../duelproject/static',
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true,
  },
  
  plugins: [react()]
})
