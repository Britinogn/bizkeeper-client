<template>
  <div class="flex flex-col gap-5">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Admin Dashboard</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Platform-wide statistics</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">

      <template v-if="loading">
        <div
          v-for="i in 6"
          :key="i"
          class="rounded-xl p-4 border border-(--border) bg-(--surface) animate-pulse"
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
            <p class="text-xs font-medium text-(--text-muted) uppercase tracking-wide">{{ card.label }}</p>
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: card.iconBg }">
              <component :is="card.icon" :size="15" :style="{ color: card.iconColor }" />
            </div>
          </div>
          <p class="text-xl font-bold font-mono text-(--text-primary) tracking-tight">{{ card.value }}</p>
          <p class="text-xs text-(--text-muted) mt-1">{{ card.sub }}</p>
        </div>
      </template>

    </div>

    <!-- Activity -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Activity :size="16" class="text-blue-400" />
          </div>
          <p class="text-sm font-semibold text-(--text-primary)">Active Last 7 Days</p>
        </div>
        <template v-if="loading">
          <div class="h-10 w-24 rounded bg-(--border) animate-pulse" />
        </template>
        <template v-else>
          <p class="text-3xl font-bold font-mono text-(--text-primary)">{{ stats?.active_users_last_7_days ?? 0 }}</p>
          <p class="text-xs text-(--text-muted)">Users active in the last 7 days</p>
        </template>
      </div>

      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Activity :size="16" class="text-purple-400" />
          </div>
          <p class="text-sm font-semibold text-(--text-primary)">Active Last 30 Days</p>
        </div>
        <template v-if="loading">
          <div class="h-10 w-24 rounded bg-(--border) animate-pulse" />
        </template>
        <template v-else>
          <p class="text-3xl font-bold font-mono text-(--text-primary)">{{ stats?.active_users_last_30_days ?? 0 }}</p>
          <p class="text-xs text-(--text-muted)">Users active in the last 30 days</p>
        </template>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Users, ShoppingBag, LayoutGrid, UserPlus, Activity } from 'lucide-vue-next'

const { loading, adminStats: stats, fetchAdminStats } = useDashboard()

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

onMounted(async () => {
  await fetchAdminStats()
})
</script>