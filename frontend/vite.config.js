import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8000', // Updated target URL to use port 8000
     
        rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Adjusted rewrite function
      },
    },
  },
})
