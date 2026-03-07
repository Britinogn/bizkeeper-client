// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // vite: {
  //   plugins: [
  //     tailwindcss(),
  //   ],
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo'
  ],
  // @ts-ignore
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    }
  },
  // seo: {
  //   redirectToCanonicalSiteUrl: true,
  //   canonicalHost: 'https://bizkeeper.ng',
  // },
})