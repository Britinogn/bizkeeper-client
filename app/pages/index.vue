<template>
  <div>
    <SharedLandingHero />
    <SharedLandingBottom />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

useSeoMeta({
  title: 'BizKeeper - Digital Purchase Records for African Business Owners',
  description: 'Stop writing in books. Record bulk purchases...',
})
</script>