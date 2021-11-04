import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  routes: {
    '/*': { ssr: false }, // Client-Side rendered
  }
})