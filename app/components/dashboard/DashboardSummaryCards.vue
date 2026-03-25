<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

    <!-- Skeleton -->
    <template v-if="loading">
      <div
        v-for="i in 4"
        :key="i"
        class="rounded-xl p-4 border border-(--border) bg-(--surface) animate-pulse"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="h-3 w-20 rounded bg-(--border)" />
          <div class="w-8 h-8 rounded-lg bg-(--border)" />
        </div>
        <div class="h-7 w-28 rounded bg-(--border) mb-2" />
        <div class="h-3 w-16 rounded bg-(--border)" />
      </div>
    </template>

    <!-- Data -->
    <template v-else>
      <div
        v-for="card in cards"
        :key="card.label"
        class="rounded-xl p-3 sm:p-4 border border-(--border) bg-(--surface)"
      >
        <div class="flex items-center justify-between mb-3">
          <p class="text-[10px] sm:text-xs font-medium text-(--text-muted) uppercase tracking-wide truncate pr-2">
            {{ card.label }}
          </p>
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            :style="{ background: card.iconBg }"
          >
            <component
              :is="card.icon"
              :size="15"
              :style="{ color: card.iconColor }"
              aria-hidden="true"
            />
          </div>
        </div>

        <p class="text-lg sm:text-xl font-bold text-(--text-primary) font-mono tracking-tight truncate">
          {{ card.value }}
        </p>
        <p class="text-[10px] sm:text-xs text-(--text-muted) mt-1">{{ card.sub }}</p>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingBag, LayoutGrid, TrendingUp, Tag } from 'lucide-vue-next'

const store = useDashboardStore()
const loading = computed(() => store.loading)
const summary = computed(() => store.summary)

const cards = computed(() => [
  {
    label: 'Total Spend',
    value: summary.value != null ? `₦${summary.value.total_spend.toLocaleString()}` : '—',
    sub: 'All time',
    icon: TrendingUp,
    iconBg: 'rgba(37,99,235,0.12)',
    iconColor: '#2563EB',
  },
  {
    label: 'Sessions',
    value: summary.value != null ? summary.value.total_sessions : '—',
    sub: 'Purchase sessions',
    icon: ShoppingBag,
    iconBg: 'rgba(5,150,105,0.12)',
    iconColor: '#059669',
  },
  {
    label: 'Products',
    value: summary.value != null ? summary.value.total_products : '—',
    sub: 'Items tracked',
    icon: LayoutGrid,
    iconBg: 'rgba(124,58,237,0.12)',
    iconColor: '#7C3AED',
  },
  {
    label: 'Top Category',
    value: summary.value?.most_bought_category || '—',
    sub: 'Most purchased',
    icon: Tag,
    iconBg: 'rgba(217,119,6,0.12)',
    iconColor: '#D97706',
  },
])
</script>