<template>
  <PageAdminPage />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

// redirect non-admins
// const store = useAuthStore()
// if (!store.isAdmin) {
//   await navigateTo('/dashboard')
// }
</script>