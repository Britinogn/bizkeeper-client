<template>
  <footer class="bg-(--surface) border-t border-(--border) px-6 md:px-12 py-12">
    <div class="max-w-7xl mx-auto">
      <!-- Main content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-y-10">
        <!-- Logo + Description -->
        <div class="md:col-span-4">
          <NuxtLink to="/" class="text-2xl font-extrabold tracking-tight text-(--text-primary)">
            {{ appName.slice(0, 3) }}<span class="text-blue-600">{{ appName.slice(3) }}</span>
          </NuxtLink>
          <p class="text-sm text-(--text-muted) mt-3 max-w-xs">
            Simple digital record keeping for African retailers & wholesalers.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3">
          <p class="font-semibold text-(--text-primary) mb-4">Product</p>
          <div class="flex flex-col gap-2.5 text-sm">
            <NuxtLink to="#features" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Features</NuxtLink>
            <NuxtLink to="#how-it-works" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">How it works</NuxtLink>
            <NuxtLink to="#pricing" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Pricing</NuxtLink>
            <NuxtLink to="/support" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Support</NuxtLink>
          </div>
        </div>

        <!-- Company -->
        <div class="md:col-span-3">
          <p class="font-semibold text-(--text-primary) mb-4">Company</p>
          <div class="flex flex-col gap-2.5 text-sm">
            <a href="#" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">About</a>
            <a href="#" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Blog</a>
            <a href="#" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Careers</a>
            <a href="mailto:hello@bizkeeper.ng" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">Contact</a>
          </div>
        </div>

        <!-- Legal + Social -->
        <div class="md:col-span-2 flex flex-col items-start md:items-end gap-6">
          <div class="flex gap-5">
            <a href="https://github.com/britinogn" target="_blank" aria-label="GitHub" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://x.com/britinogn" target="_blank" aria-label="X" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com/in/britinogn" target="_blank" aria-label="LinkedIn" class="text-(--text-muted) hover:text-(--text-primary) transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          <!-- <button
            @click="scrollToTop"
            class="flex items-center gap-2 text-xs font-medium text-(--text-muted) hover:text-blue-600 transition-colors group"
          >
            <span>↑ Back to top</span>
            <span class="transition-transform group-hover:-translate-y-0.5">↑</span>
          </button> -->
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-8 border-t border-(--border) flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-(--text-muted)">
        <span>© 2026 {{ appName }} • Built with ❤️ in Lagos, Nigeria</span>

        <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end">
          <NuxtLink to="/support" class="hover:text-(--text-primary) transition-colors">Support</NuxtLink>
          <a href="#" class="hover:text-(--text-primary) transition-colors">Privacy</a>
          <a href="#" class="hover:text-(--text-primary) transition-colors">Terms</a>
          <a href="mailto:hello@bizkeeper.ng" class="hover:text-(--text-primary) transition-colors">Contact</a>
        </div>

        <!-- Floating-style Back to Top on mobile too -->
        <button
          @click="scrollToTop"
          class="md:hidden flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          ↑ Back to top
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>