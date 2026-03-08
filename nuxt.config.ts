import tailwindcss from "@tailwindcss/vite";
import outray from "@outray/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      title: 'BizKeeper',
      meta: [
        { name: 'description', content: 'A digital ledger for business owners to track bulk purchases.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
  //css: ["./app/assets/css/main.css"],

  vite: {
    // @ts-ignore - vite version mismatch between @tailwindcss/vite and nuxt
    plugins: [tailwindcss(), outray()],
  },

  typescript: {
    typeCheck: false,
  },

  modules: [
    // '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo'
  ],

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  // typescript: {
  //   typeCheck: true,
  // },

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api',
    },
  },
})