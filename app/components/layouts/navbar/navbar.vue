<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center justify-between px-5 sm:px-8 md:px-12 transition-all duration-300"
    :class="{
      'bg-(--background)/95 backdrop-blur-lg shadow-sm': isScrolled,
      'bg-(--background)/80 backdrop-blur-md border-b border-(--border)': !isScrolled
    }"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="text-xl sm:text-2xl font-extrabold tracking-tight text-(--text-primary) flex items-center gap-1.5"
    >
      {{ appName.slice(0, 3) }}<span class="text-blue-600">{{ appName.slice(3) }}</span>
    </NuxtLink>

    <!-- Desktop links -->
    <ul class="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-(--text-muted)">
      <li v-for="link in navLinks" :key="link.label">
        <a
          :href="link.href"
          class="hover:text-(--text-primary) transition-colors duration-200 relative group py-1"
        >
          {{ link.label }}
          <span class="absolute bottom-0 left-0 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full w-full"></span>
        </a>
      </li>
    </ul>

    <!-- Desktop actions -->
    <div class="hidden md:flex items-center gap-4 lg:gap-5">
      <ThemeToggle />
      <NuxtLink
        to="/auth/login"
        class="text-sm font-medium text-(--text-muted) hover:text-(--text-primary) px-4 py-2 transition-colors"
      >
        Sign in
      </NuxtLink>
      <NuxtLink
        to="/auth/register"
        class="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-sm"
      >
        Get Started Free
      </NuxtLink>
    </div>

    <!-- Mobile: theme + hamburger -->
    <div class="md:hidden flex items-center gap-3">
      <ThemeToggle />
      <button
        class="p-2 -mr-2 touch-manipulation"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <div class="flex flex-col gap-1.5">
          <span
            class="block w-6 h-0.5 bg-(--text-muted) rounded-full transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': menuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-(--text-muted) rounded-full transition-all duration-300"
            :class="{ 'opacity-0 scale-75': menuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-(--text-muted) rounded-full transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': menuOpen }"
          />
        </div>
      </button>
    </div>
  </nav>

  <!-- Mobile menu overlay -->
  <div
    v-if="menuOpen"
    class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
    @click="menuOpen = false"
  >
    <div
      class="fixed top-0 left-0 right-0 bg-(--surface) border-b border-(--border) px-6 pt-20 pb-8 max-h-screen overflow-y-auto"
      @click.stop
    >
      <div class="flex flex-col gap-2">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="py-3.5 px-4 text-base font-medium text-(--text-primary) hover:bg-(--border)/50 rounded-xl transition-colors active:bg-(--border)"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>

        <div class="h-px bg-(--border) my-3"></div>

        <NuxtLink
          to="/auth/login"
          class="py-3.5 px-4 text-base font-medium text-(--text-primary) hover:bg-(--border)/50 rounded-xl transition-colors active:bg-(--border)"
          @click="menuOpen = false"
        >
          Sign in
        </NuxtLink>

        <NuxtLink
          to="/auth/register"
          class="mt-3 py-4 px-6 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-[0.98] shadow-md text-center"
          @click="menuOpen = false"
        >
          Get Started Free
        </NuxtLink>

        <!-- Optional trust line in mobile menu -->
        <p class="text-xs text-(--text-muted) text-center mt-6">
          No card needed • Cancel anytime
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: '/support' }
]

// Simple scroll shadow effect
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>