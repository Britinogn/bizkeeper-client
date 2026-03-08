<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <ToastAppToaster />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'BizKeeper',
  description: 'A digital ledger for business owners to track bulk purchases.',
  ogTitle: 'BizKeeper',
  ogDescription: 'A digital ledger for business owners to track bulk purchases.',
})
</script>




<!-- <template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
      <ToastContainer />
      <GlobalLoader />
    </NuxtLayout>
  </ClientOnly>
</template> -->