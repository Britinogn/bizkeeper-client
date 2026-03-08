<template>
  <div>
    <p class="text-white">Dashboard works</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
</script>