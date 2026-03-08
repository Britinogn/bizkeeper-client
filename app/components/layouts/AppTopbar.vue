<template>
  <header class="h-16 flex items-center justify-between px-6 border-b border-(--border) bg-(--background) z-30 relative">

    <!-- Left -->
    <div class="flex items-center gap-3">
      <button
        class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-(--border) bg-(--surface) hover:border-(--primary-hover) transition-colors"
        @click="emit('toggleSidebar')"
      >
        <Menu :size="16" class="text-(--text-muted)" />
      </button>
      <h1 class="text-sm font-semibold text-(--text-primary)">{{ pageTitle }}</h1>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-3">

      <ThemeToggle />

      <button class="relative flex items-center justify-center w-9 h-9 rounded-lg border border-(--border) bg-(--surface) hover:border-(--primary-hover) transition-colors">
        <Bell :size="16" class="text-(--text-muted)" />
        <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
      </button>

      <!-- Avatar dropdown -->
      <div class="relative pl-3 border-l border-(--border)" ref="avatarRef">
        <button
          class="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          @click="dropdownOpen = !dropdownOpen"
        >
          <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {{ initials }}
          </div>
          <div class="hidden sm:block text-left">
            <p class="text-xs font-medium text-(--text-primary) leading-tight">{{ fullName }}</p>
            <p class="text-[10px] text-(--text-muted) leading-tight capitalize">{{ role }}</p>
          </div>
          <ChevronDown :size="14" class="text-(--text-muted) hidden sm:block" />
        </button>

        <!-- Dropdown -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 top-12 w-56 rounded-xl border border-(--border) bg-(--surface) shadow-xl z-50 overflow-hidden"
        >
          <div class="px-4 py-3 border-b border-(--border)">
            <p class="text-sm font-medium text-(--text-primary)">{{ fullName  }}</p>
            <p class="text-xs text-(--text-muted) mt-0.5">{{ email }}</p>
          </div>

          <div class="py-1">
            <NuxtLink
              to="/dashboard/profile"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background) transition-colors"
              @click="dropdownOpen = false"
            >
              <UserCircle :size="15" />
              Profile
            </NuxtLink>
            <NuxtLink
              to="/dashboard/settings"
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background) transition-colors"
              @click="dropdownOpen = false"
            >
              <Settings :size="15" />
              Settings
            </NuxtLink>
          </div>

          <div class="py-1 border-t border-(--border)">
            <button
              class="flex items-center gap-3 px-4 py-2.5 text-sm text-(--text-muted) hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
              @click="handleLogout"
            >
              <LogOut :size="15" />
              Logout
            </button>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { Bell, Menu, ChevronDown, UserCircle, Settings, LogOut } from 'lucide-vue-next'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits<{ toggleSidebar: [] }>()

const route = useRoute()
const store = useAuthStore()
const { logout, fetchProfile } = useAuth()

const dropdownOpen = ref(false)
const avatarRef = ref<HTMLElement | null>(null)

onClickOutside(avatarRef, () => { dropdownOpen.value = false })

// fetch profile on mount if not already loaded
onMounted(async () => {
  if (!store.user) {
    await fetchProfile()
  }
})

const pageTitle = computed(() => {
  const name = route.name?.toString() ?? ''
  if (name.includes('dashboard-purchases')) return 'Ledger'
  if (name.includes('dashboard-price-history')) return 'Price History'
  if (name.includes('dashboard-reorder')) return 'Reorder Reminders'
  if (name.includes('dashboard-export')) return 'Export'
  if (name.includes('dashboard-profile')) return 'Profile'
  if (name.includes('dashboard-settings')) return 'Settings'
  if (name.includes('dashboard-admin')) return 'Admin'
  return 'Dashboard'
})

const fullName = computed(() => store.fullName)
const email = computed(() => store.user?.email ?? '')
const role = computed(() => store.user?.role ?? '')
const initials = computed(() => {
  if (!store.user) return 'U'
  return `${store.user.first_name[0]}${store.user.last_name[0]}`.toUpperCase()
})

function handleLogout() {
  dropdownOpen.value = false
  logout()
}
</script>