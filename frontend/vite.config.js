import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Updated target URL to use port 8000
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Adjusted rewrite function
      },
    },
  },
  plugins: [react()],
});
