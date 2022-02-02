import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  build: {
    transpile: ['@popperjs/core', 'highlight.js']
  },
  vite: false,
  ssr: process.env.NODE_ENV == 'development' ? false : true
})