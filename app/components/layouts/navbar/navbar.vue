<template>
  <nav class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-(--background)/90 backdrop-blur-md border-b border-(--border)">
    <NuxtLink to="/" class="text-base font-bold tracking-tight text-(--text-primary)">
      {{ appName.slice(0, 3) }}<span class="text-blue-500">{{ appName.slice(3) }}</span>
    </NuxtLink>

    <ul class="hidden md:flex items-center gap-8 text-sm text-(--text-muted)">
      <li v-for="link in navLinks" :key="link.label">
        <a :href="link.href" class="hover:text-(--text-primary) transition-colors">{{ link.label }}</a>
      </li>
    </ul>

    <!-- Desktop actions -->
    <div class="hidden md:flex items-center gap-3">
      <ThemeToggle />
      <NuxtLink to="/auth/login" class="text-sm text-(--text-muted) hover:text-(--text-primary) px-4 py-2 transition-colors">
        Sign in
      </NuxtLink>
      <NuxtLink to="/auth/register" class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
        Get started
      </NuxtLink>
    </div>

    <!-- Mobile: theme toggle + hamburger -->
    <div class="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button class="flex flex-col gap-1.5 p-1" @click="menuOpen = !menuOpen">
        <span class="block w-5 h-0.5 bg-(--text-muted) rounded transition-all" :class="{ 'rotate-45 translate-y-2': menuOpen }" />
        <span class="block w-5 h-0.5 bg-(--text-muted) rounded transition-all" :class="{ 'opacity-0': menuOpen }" />
        <span class="block w-5 h-0.5 bg-(--text-muted) rounded transition-all" :class="{ '-rotate-45 -translate-y-2': menuOpen }" />
      </button>
    </div>
  </nav>

  <!-- Mobile menu -->
  <div v-if="menuOpen" class="fixed top-16 left-0 right-0 z-40 bg-(--surface) border-b border-(--border) px-6 py-4 flex flex-col gap-1 md:hidden">
    <a
      v-for="link in navLinks"
      :key="link.label"
      :href="link.href"
      class="py-3 text-sm text-(--text-muted) hover:text-(--text-primary) border-b border-(--border) transition-colors"
      @click="menuOpen = false"
    >
      {{ link.label }}
    </a>
    <NuxtLink to="/auth/login" class="py-3 text-sm text-(--text-muted) hover:text-(--text-primary) border-b border-(--border) transition-colors" @click="menuOpen = false">
      Sign in
    </NuxtLink>
    <NuxtLink to="/auth/register" class="mt-2 py-3 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" @click="menuOpen = false">
      Get started free
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  // { label: 'Support', href: '#support' },
]
</script>