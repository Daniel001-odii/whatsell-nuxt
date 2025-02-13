// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "radix-vue/nuxt"],
  compatibilityDate: "2025-02-12",
  css: [
    "~/assets/css/main.css",
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api' // Make sure this is correct
    }
  }
})