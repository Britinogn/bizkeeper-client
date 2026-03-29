import tailwindcss from "@tailwindcss/vite";
import outray from "@outray/vite";
import { seoConfig } from './app/config/seo.config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  // app: {
  //   head: {
  //     title: 'BizKeeper',
  //     meta: [
  //       { name: 'description', content: 'A digital ledger for business owners to track bulk purchases.' }
  //     ],
  //     link: [
  //       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //       { rel: 'manifest', href: '/manifest.webmanifest' }, 
  //       // {rel: "manifest", href: "/manifest.json"}
  //     ]
  //   }
  // },


  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: `%s | ${seoConfig.appName}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: seoConfig.description },
        { name: 'keywords', content: seoConfig.keywords },
        { name: 'theme-color', content: seoConfig.themeColor },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: seoConfig.siteName },
        { property: 'og:locale', content: seoConfig.locale },
      ],
      link: [
        { rel: 'canonical', href: seoConfig.url },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
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
    '@nuxtjs/seo',
    '@vite-pwa/nuxt'
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

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'BizKeeper',
      short_name: 'BizKeeper',
      description: 'Digital purchase records for business owners',
      theme_color: '#2563EB',
      background_color: '#0F0F0F',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      }
    }
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || 'https://bizkeeper-backend.onrender.com/api',
    },
  },
})