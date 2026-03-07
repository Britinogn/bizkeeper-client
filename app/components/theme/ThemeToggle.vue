<template>
  <button
    @click="toggleColorMode"
    class="relative flex items-center justify-center w-9 h-9 rounded-lg border border-(--border) bg-(--surface) hover:border-(--primary-hover) transition-all duration-200"
    :title="`Switch to ${isDark ? 'light' : 'dark'} mode`"
  >
    <Sun v-if="isDark" :size="18" class="text-(--text-muted) hover:text-white transition-colors" />
    <Moon v-else :size="18" class="text-(--text-muted) hover:text-white transition-colors" />
  </button>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>