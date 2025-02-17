// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv';
config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui", 
    "radix-vue/nuxt",
    "vue3-carousel-nuxt",
  ],

  plugins: ['~/plugins/axios.js'],
  compatibilityDate: "2025-02-12",
  css: [
    "~/assets/css/main.css",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  }
})