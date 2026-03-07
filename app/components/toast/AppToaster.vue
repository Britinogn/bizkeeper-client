<template>
  <Toaster
    position="top-right"
    :duration="4000"
    richColors
    closeButton
    :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
  />
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const colorMode = useColorMode()
</script>