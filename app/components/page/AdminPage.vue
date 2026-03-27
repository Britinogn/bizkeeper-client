<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Admin Dashboard</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Platform-wide statistics</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <template v-if="loading">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-xl p-4 border border-(--border) bg-(--surface) animate-pulse"
          aria-hidden="true"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="h-3 w-20 rounded bg-(--border)" />
            <div class="w-8 h-8 rounded-lg bg-(--border)" />
          </div>
          <div class="h-7 w-24 rounded bg-(--border) mb-2" />
          <div class="h-3 w-16 rounded bg-(--border)" />
        </div>
      </template>

      <template v-else>
        <div
          v-for="card in cards"
          :key="card.label"
          class="rounded-xl p-4 border border-(--border) bg-(--surface)"
        >
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs font-medium text-(--text-muted) uppercase tracking-wide truncate pr-2">{{ card.label }}</p>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :style="{ background: card.iconBg }">
              <component :is="card.icon" :size="15" :style="{ color: card.iconColor }" />
            </div>
          </div>
          <p class="text-xl font-bold font-mono text-(--text-primary) tracking-tight truncate">{{ card.value }}</p>
          <p class="text-xs text-(--text-muted) mt-1">{{ card.sub }}</p>
        </div>
      </template>

    </div>

    <!-- Activity -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <Activity :size="16" class="text-blue-400" />
          </div>
          <p class="text-sm font-semibold text-(--text-primary)">Active Last 7 Days</p>
        </div>
        <template v-if="loading">
          <div class="h-10 w-24 rounded bg-(--border) animate-pulse" aria-hidden="true" />
        </template>
        <template v-else>
          <p class="text-3xl font-bold font-mono text-(--text-primary)">{{ stats?.active_users_last_7_days ?? 0 }}</p>
          <p class="text-xs text-(--text-muted)">Users active in the last 7 days</p>
        </template>
      </div>

      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
            <CalendarDays :size="16" class="text-purple-400" />
          </div>
          <p class="text-sm font-semibold text-(--text-primary)">Active Last 30 Days</p>
        </div>
        <template v-if="loading">
          <div class="h-10 w-24 rounded bg-(--border) animate-pulse" aria-hidden="true" />
        </template>
        <template v-else>
          <p class="text-3xl font-bold font-mono text-(--text-primary)">{{ stats?.active_users_last_30_days ?? 0 }}</p>
          <p class="text-xs text-(--text-muted)">Users active in the last 30 days</p>
        </template>
      </div>

    </div>

    <!-- Users table + Right column -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Users table (2/3 width on lg) -->
      <div class="lg:col-span-2 rounded-xl border border-(--border) bg-(--surface) overflow-hidden">

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-b border-(--border)">
          <p class="text-sm font-semibold text-(--text-primary) shrink-0">All Users</p>
          <div class="flex items-center gap-2">
            <div class="relative flex-1 sm:w-48">
              <Search :size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input
                v-model="userSearch"
                type="text"
                placeholder="Search name or email"
                class="w-full h-8 pl-8 pr-3 rounded-lg border border-(--border) bg-(--background) text-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              />
            </div>
            <select
              v-model="userRoleFilter"
              class="h-8 px-2 rounded-lg border border-(--border) bg-(--background) text-xs text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
            >
              <option value="">All roles</option>
              <option value="admin">Admin</option>
              <option value="owner">User</option>
            </select>
          </div>
        </div>

        <!-- Skeleton -->
        <template v-if="loading">
          <div class="divide-y divide-(--border)" aria-hidden="true">
            <div
              v-for="i in 5"
              :key="i"
              class="flex items-center gap-3 px-4 py-3 animate-pulse"
            >
              <div class="w-7 h-7 rounded-full bg-(--border) shrink-0" />
              <div class="flex flex-col gap-1.5 flex-1 min-w-0">
                <div class="h-3 w-28 rounded bg-(--border)" />
                <div class="h-2.5 w-40 rounded bg-(--border)" />
              </div>
              <div class="h-5 w-12 rounded-full bg-(--border)" />
              <div class="h-2.5 w-20 rounded bg-(--border)" />
            </div>
          </div>
        </template>

        <!-- Empty -->
        <div v-else-if="!filteredUsers.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
          No users found
        </div>

        <!-- Scrollable Users Table -->
        <div v-else class="overflow-x-auto scrollbar-thin scrollbar-thumb-(--border) hover:scrollbar-thumb-(--text-muted)/50">
          <table class="w-full min-w-145">
            <thead>
              <tr class="border-b border-(--border)">
                <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">User</th>
                <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Role</th>
                <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Joined</th>
                <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Last Active</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="border-b border-(--border) last:border-0 hover:bg-(--background) transition-colors"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <span class="text-[10px] font-semibold text-blue-400 uppercase">{{ userInitials(user) }}</span>
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-(--text-primary) truncate">{{ user.first_name }} {{ user.last_name }}</p>
                      <p class="text-xs text-(--text-muted) truncate">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize"
                    :class="user.role === 'admin'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-blue-500/10 text-blue-400'"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-(--text-muted)">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-4 py-3 text-xs text-(--text-muted) text-right">
                  {{ user.last_active_at ? formatDate(user.last_active_at) : '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <!-- Right column -->
      <div class="flex flex-col gap-4">

        <!-- Recent activity feed -->
        <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
          <div class="px-4 py-3 border-b border-(--border)">
            <p class="text-sm font-semibold text-(--text-primary)">Recent Activity</p>
          </div>

          <template v-if="loading">
            <div class="divide-y divide-(--border)" aria-hidden="true">
              <div
                v-for="i in 5"
                :key="i"
                class="flex items-start gap-3 px-4 py-3 animate-pulse"
              >
                <div class="w-6 h-6 rounded-full bg-(--border) shrink-0 mt-0.5" />
                <div class="flex flex-col gap-1.5 flex-1">
                  <div class="h-3 w-full rounded bg-(--border)" />
                  <div class="h-2.5 w-16 rounded bg-(--border)" />
                </div>
              </div>
            </div>
          </template>

          <div v-else-if="!activityFeed.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
            No recent activity
          </div>

          <div v-else class="divide-y divide-(--border)">
            <div
              v-for="event in activityFeed"
              :key="event.id"
              class="flex items-start gap-3 px-4 py-3 hover:bg-(--background) transition-colors"
            >
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                :style="{ background: event.iconBg }"
              >
                <component :is="event.icon" :size="11" :style="{ color: event.iconColor }" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-(--text-primary) leading-snug">{{ event.message }}</p>
                <p class="text-[10px] text-(--text-muted) mt-0.5">{{ formatRelative(event.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top spenders -->
        <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
          <div class="px-4 py-3 border-b border-(--border)">
            <p class="text-sm font-semibold text-(--text-primary)">Top Spenders</p>
          </div>

          <template v-if="loading">
            <div class="divide-y divide-(--border)" aria-hidden="true">
              <div
                v-for="i in 5"
                :key="i"
                class="flex items-center gap-3 px-4 py-3 animate-pulse"
              >
                <div class="h-3 w-4 rounded bg-(--border) shrink-0" />
                <div class="w-6 h-6 rounded-full bg-(--border) shrink-0" />
                <div class="h-3 flex-1 rounded bg-(--border)" />
                <div class="h-3 w-16 rounded bg-(--border)" />
              </div>
            </div>
          </template>

          <div v-else-if="!topSpenders.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
            No data yet
          </div>

          <div v-else class="divide-y divide-(--border)">
            <div
              v-for="(spender, index) in topSpenders"
              :key="spender.user_id"
              class="flex items-center gap-3 px-4 py-3 hover:bg-(--background) transition-colors"
            >
              <span
                class="text-xs font-bold font-mono w-4 text-center shrink-0"
                :class="index === 0
                  ? 'text-yellow-400'
                  : index === 1
                  ? 'text-slate-400'
                  : index === 2
                  ? 'text-amber-600'
                  : 'text-(--text-muted)'"
              >
                {{ index + 1 }}
              </span>
              <div class="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <span class="text-[9px] font-semibold text-blue-400 uppercase">{{ spender.initials }}</span>
              </div>
              <p class="text-xs text-(--text-primary) truncate flex-1">{{ spender.name }}</p>
              <p class="text-xs font-semibold font-mono text-blue-400 shrink-0">₦{{ spender.total_spend.toLocaleString() }}</p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Users, ShoppingBag, LayoutGrid, UserPlus,
  Activity, CalendarDays, Search,
  UserCheck, PackagePlus, LogIn,
} from 'lucide-vue-next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const { loading, adminStats: stats, fetchAdminStats } = useDashboard()

// ── Users table ───────────────────────────────────────────────────────────────

const userSearch = ref('')
const userRoleFilter = ref('')

const allUsers = computed(() => stats.value?.users ?? [])

const filteredUsers = computed(() => {
  let list = allUsers.value
  const q = userSearch.value.trim().toLowerCase()
  if (q) {
    list = list.filter((u: any) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    )
  }
  if (userRoleFilter.value) {
    list = list.filter((u: any) => u.role === userRoleFilter.value)
  }
  return list
})

function userInitials(user: any) {
  return `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}` || 'U'
}

// ── Activity feed ─────────────────────────────────────────────────────────────

const iconMap: Record<string, { icon: any; iconBg: string; iconColor: string }> = {
  new_user: {
    icon: UserCheck,
    iconBg: 'rgba(37,99,235,0.12)',
    iconColor: '#2563EB',
  },
  new_session: {
    icon: ShoppingBag,
    iconBg: 'rgba(5,150,105,0.12)',
    iconColor: '#059669',
  },
  new_product: {
    icon: PackagePlus,
    iconBg: 'rgba(124,58,237,0.12)',
    iconColor: '#7C3AED',
  },
  login: {
    icon: LogIn,
    iconBg: 'rgba(217,119,6,0.12)',
    iconColor: '#D97706',
  },
}

const activityFeed = computed(() =>
  (stats.value?.recent_activity ?? []).map((event: any) => ({
    ...event,
    ...(iconMap[event.type] ?? iconMap['login']),
  }))
)

// ── Top spenders ──────────────────────────────────────────────────────────────

const topSpenders = computed(() =>
  (stats.value?.top_spenders ?? []).map((s: any) => ({
    ...s,
    initials: `${s.first_name?.[0] ?? ''}${s.last_name?.[0] ?? ''}` || 'U',
    name: `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim() || s.email,
  }))
)

// ── Stats cards ───────────────────────────────────────────────────────────────

const cards = computed(() => [
  {
    label: 'Total Users',
    value: stats.value?.total_users ?? 0,
    sub: 'Registered accounts',
    icon: Users,
    iconBg: 'rgba(37,99,235,0.12)',
    iconColor: '#2563EB',
  },
  {
    label: 'Total Sessions',
    value: stats.value?.total_sessions ?? 0,
    sub: 'Purchase sessions',
    icon: ShoppingBag,
    iconBg: 'rgba(5,150,105,0.12)',
    iconColor: '#059669',
  },
  {
    label: 'Total Products',
    value: stats.value?.total_product_items ?? 0,
    sub: 'Product items tracked',
    icon: LayoutGrid,
    iconBg: 'rgba(124,58,237,0.12)',
    iconColor: '#7C3AED',
  },
  {
    label: 'New This Month',
    value: stats.value?.new_users_this_month ?? 0,
    sub: 'New users this month',
    icon: UserPlus,
    iconBg: 'rgba(217,119,6,0.12)',
    iconColor: '#D97706',
  },
])

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(date?: string) {
  if (!date) return '—'
  return dayjs(date).format('MMM D, YYYY')
}

function formatRelative(date?: string) {
  if (!date) return '—'
  return dayjs(date).fromNow()
}

// ── Init ──────────────────────────────────────────────────────────────────────

onMounted(async () => {
  await fetchAdminStats()
})
</script>