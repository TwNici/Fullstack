import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig(({command, mode} )=> {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_OPEN_API_KEY)
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080'
        }
      }
    }
  }
})
