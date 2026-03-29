<template>
  <div>
    <SharedLandingHero />
    <SharedLandingBottom />
  </div>
</template>

<script setup lang="ts">
import { seoConfig } from '~/config/seo.config';

definePageMeta({ middleware: 'guest' })

// useSeoMeta({
//   title: 'BizKeeper - Digital Purchase Records for Business Owners',
//   description: 'Stop writing in books. Record bulk purchases...',
// })

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
  twitterCard: 'summary_large_image',
  twitterTitle: seoConfig.title,
  twitterDescription: seoConfig.description,
  twitterImage: seoConfig.twitterImage,
})

useHead({
  link: [{ rel: 'canonical', href: seoConfig.url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(seoConfig.schema),
    }
  ]
})


</script>