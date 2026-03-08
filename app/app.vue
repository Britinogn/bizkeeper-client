<script setup lang="ts">
import { seoConfig } from '~/config/seo.config'

useSeoMeta({
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  ogTitle: seoConfig.title,
  ogDescription: seoConfig.description,
  ogImage: seoConfig.ogImage,
  ogUrl: seoConfig.url,
  ogSiteName: seoConfig.siteName,
  ogLocale: seoConfig.locale,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: seoConfig.title,
  twitterDescription: seoConfig.description,
  twitterImage: seoConfig.twitterImage,
  themeColor: seoConfig.themeColor,
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: seoConfig.url }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(seoConfig.schema) }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ToastAppToaster />
    <!-- <GlobalLoader /> -->
  </NuxtLayout>
</template>



<!-- <template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
      <ToastContainer />
      <GlobalLoader />
    </NuxtLayout>
  </ClientOnly>
</template> -->