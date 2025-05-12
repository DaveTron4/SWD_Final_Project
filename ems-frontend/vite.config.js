import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // set the port to 3000
    port: 3000,
    // set the proxy to redirect API calls to the backend server
  }
})
