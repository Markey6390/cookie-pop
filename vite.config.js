import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'

// https://vite.dev/config/
export default defineConfig({
  base: '/cookie-pop/',
  plugins: [vue(), tailwindcss()],
  css: {
    postcss,
  },
})
