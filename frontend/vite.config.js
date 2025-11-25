import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    // this is the important part
    proxy: {
      '/events': 'http://localhost:5000',
      '/registrations': 'http://localhost:5000'
    }
  }
});
