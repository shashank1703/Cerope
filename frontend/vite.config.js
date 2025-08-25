import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Any request starting with '/api' will be proxied
      '/api': {
        // ==> IMPORTANT: CHANGE THIS TO YOUR BACKEND SERVER'S ADDRESS <==
        target: 'http://localhost:3000', // Or 5000, or whatever your backend runs on
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be helpful if your backend is not using HTTPS
      },
    },
  },

})