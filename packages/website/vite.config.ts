import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ include: "**/*.tsx", }),
  ],
  assetsInclude: ['**/*.md'],
  root: './src',
  base: "/",
  envDir: "../",
  server: {
    host: true,
    port: 3102,
    watch: {
      usePolling: true
    },
    hmr: true,
  },
})
