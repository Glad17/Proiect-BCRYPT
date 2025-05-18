// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  vite:{
    build: {
      sourcemap: true
    }
  },
  sourcemap:{
    server: true,
    client: true
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  devServer: {
    port: 3001
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    typeCheck: true
  },

  modules: ['@nuxt/eslint', '@nuxt/icon'],


  
})