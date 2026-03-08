<template>
  <!-- Mobile overlay -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-30 bg-black/50 md:hidden"
    @click="mobileOpen = false"
  />

  <aside
    class="flex flex-col h-screen border-r border-(--border) bg-(--surface) fixed top-0 left-0 z-40 transition-all duration-200"
    :class="[
      collapsed ? 'w-16' : 'w-60',
      mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-(--border) gap-3">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
        BK
      </div>
      <span v-if="!collapsed" class="text-sm font-bold text-(--text-primary) tracking-tight">
        Biz<span class="text-blue-500">Keeper</span>
      </span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto">
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="isActive(item.to)
          ? 'bg-blue-600/15 text-blue-400'
          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background)'"
        @click="mobileOpen = false"
      >
        <component :is="item.icon" :size="16" class="shrink-0" />
        <span v-if="!collapsed">{{ item.label }}</span>
      </NuxtLink>

      <!-- Admin only -->
      <NuxtLink
        v-if="isAdmin"
        to="/dashboard/admin"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="isActive('/dashboard/admin')
          ? 'bg-blue-600/15 text-blue-400'
          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background)'"
        @click="mobileOpen = false"
      >
        <ShieldCheck :size="16" class="shrink-0" />
        <span v-if="!collapsed">Admin</span>
      </NuxtLink>
    </nav>

    <!-- Bottom -->
    <div class="px-2 py-4 border-t border-(--border) flex flex-col gap-1">
      <NuxtLink
        to="/dashboard/profile"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="isActive('/dashboard/profile')
          ? 'bg-blue-600/15 text-blue-400'
          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background)'"
        @click="mobileOpen = false"
      >
        <UserCircle :size="16" class="shrink-0" />
        <span v-if="!collapsed">Profile</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/settings"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="isActive('/dashboard/settings')
          ? 'bg-blue-600/15 text-blue-400'
          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background)'"
        @click="mobileOpen = false"
      >
        <Settings :size="16" class="shrink-0" />
        <span v-if="!collapsed">Settings</span>
      </NuxtLink>

      <button
        @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-(--text-muted) hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
      >
        <LogOut :size="16" class="shrink-0" />
        <span v-if="!collapsed">Logout</span>
      </button>
    </div>

    <!-- Desktop only collapse toggle -->
    <button
      class="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full border border-(--border) bg-(--surface) items-center justify-center hover:border-blue-600 transition-colors"
      @click="collapsed = !collapsed"
    >
      <ChevronLeft v-if="!collapsed" :size="12" class="text-(--text-muted)" />
      <ChevronRight v-else :size="12" class="text-(--text-muted)" />
    </button>
  </aside>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, BookOpen, Download,
  Settings, UserCircle, LogOut,
  ShieldCheck, ChevronLeft, ChevronRight,
  TrendingUp, Bell
} from 'lucide-vue-next'

const route = useRoute()
const store = useAuthStore()
const { logout } = useAuth()

const collapsed = ref(false)
const mobileOpen = ref(false)
defineExpose({ mobileOpen })

const isAdmin = computed(() => store.isAdmin)

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Ledger', to: '/dashboard/purchases', icon: BookOpen },
  { label: 'Price History', to: '/dashboard/price-history', icon: TrendingUp },
  { label: 'Reorder', to: '/dashboard/reorder', icon: Bell },
  { label: 'Export', to: '/dashboard/export', icon: Download },
]

function isActive(path: string) {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(path)
}

function handleLogout() {
  logout()
}
</script>