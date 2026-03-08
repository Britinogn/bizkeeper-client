<template>
  <div>
    <SharedLandingHero />
    <SharedLandingBottom />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

useSeoMeta({
  title: 'BizKeeper — Digital Ledger for Business Owners',
  description: 'Track bulk purchases, monitor price changes and get reorder reminders. Built for Nigerian business owners.',
})
</script>