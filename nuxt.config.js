import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  build: {
    transpile: ['@popperjs/core', 'highlight.js']
  },
})