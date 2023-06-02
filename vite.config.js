import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://jair8choa.github.io/svelte-swpit/",
  plugins: [svelte()],
  server:{
    host: '127.0.0.1'
  }
})
