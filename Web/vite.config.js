import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces (IPv4 + IPv6) so 127.0.0.1, ::1, and
    // localhost all work — some previews/browsers resolve to IPv4.
    host: true,
    port: 5173,
  },
})
