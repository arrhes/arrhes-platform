import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md", "**/*.woff2"],
  server: {
    host: true,
    port: 3101,
    watch: {
      usePolling: true
    },
    hmr: true,
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        entryFileNames: "[hash].js",
        chunkFileNames: "[hash].js",
        assetFileNames: "[hash].[ext]",
        manualChunks(id: string) {
          if (id.includes('react-dom')) {
            return 'react-dom'
          }
        },

      }
    }
  },
})
