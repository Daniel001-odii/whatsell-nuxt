// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv';
config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui", 
    "radix-vue/nuxt",
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
    "vue3-carousel-nuxt"
  ],

  plugins: ['~/plugins/axios.js'],
  compatibilityDate: "2025-02-12",
  css: [
    "~/assets/css/main.css",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      openCageAPIKey: process.env.OPEN_CAGE_API_KEY,
      googleAnalytics: {
        id: 'G-TNS7YNXYQB' // Replace with your GA4 Measurement ID
      }
    }
  },
  app: {
    head: {
      title: 'WhatSell Online Store', // Default title
      meta: [
        // Standard SEO meta tags
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover the best deals and shop your favorite products on WhatSell. Join our community and enjoy exclusive offers and updates.' },
        { name: 'keywords', content: 'WhatSell, online store, e-commerce, shopping, deals, offers' },
        { name: 'author', content: 'WhatSell' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://whatsell.store' },
        { property: 'og:title', content: 'WhatSell Online Store' },
        { property: 'og:description', content: 'Discover the best deals and shop your favorite products on WhatSell. Join our community and enjoy exclusive offers and updates.' },
        { property: 'og:image', content: 'https://raw.githubusercontent.com/Daniel001-odii/WhaSell/refs/heads/main/src/assets/images/whatsell_email_header.png' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://whatsell.store' },
        { name: 'twitter:title', content: 'WhatSell Online Store' },
        { name: 'twitter:description', content: 'Discover the best deals and shop your favorite products on WhatSell. Join our community and enjoy exclusive offers and updates.' },
        { name: 'twitter:image', content: 'https://raw.githubusercontent.com/Daniel001-odii/WhaSell/refs/heads/main/src/assets/images/whatsell_email_header.png' },
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Google Fonts: Poppins
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap',
        },
      ],
      style: [
        // Apply Poppins as the default font globally
        {
          children: `
            body {
              font-family: 'Poppins', sans-serif;
            }
          `,
        },
      ],
    },
  },
})

/* 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"> */