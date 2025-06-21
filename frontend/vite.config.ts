import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd())

  // Get the port from environment variable
  const port = parseInt(env.VITE_PORT || '3000')

  return {
    plugins: [react()],
    server: {
      port: port,
      open: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    optimizeDeps: {
      exclude: ['node_modules_old']
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    }
  }
})
