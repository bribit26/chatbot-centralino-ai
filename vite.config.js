import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        entryFileNames: 'widget.js',
        assetFileNames: 'widget.[ext]',
        dir: 'dist',
        format: 'iife',
        name: 'ChatbotCentralino',
      }
    },
    cssCodeSplit: false,
  }
})
