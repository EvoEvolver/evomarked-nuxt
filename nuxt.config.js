import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  build: {
    transpile: ['@popperjs','highlight.js','tippy.js']
  },
  vite: false
})