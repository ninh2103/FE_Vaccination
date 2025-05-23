import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    open: true
  },
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('html2canvas')) return 'html2canvas'
            if (id.includes('purify')) return 'purify'
            return 'vendor'
          }

          if (id.includes('/src/pages/')) {
            return 'pages'
          }

          if (id.includes('/src/components/')) {
            return 'components'
          }
          if (id.includes('lodash')) return 'lodash'
          if (id.includes('chart.js')) return 'charts'
          if (id.includes('chartjs-plugin-datalabels')) return 'charts'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
