<template>
  <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">

    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
      <p class="text-sm font-semibold text-(--text-primary)">Reorder Reminders</p>
      <span
        v-if="!loading && reorderReminders.length"
        class="text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400"
      >
        {{ reorderReminders.length }} items
      </span>
    </div>

    <!-- Skeleton -->
    <template v-if="loading">
      <div class="divide-y divide-(--border)" aria-hidden="true">
        <div
          v-for="i in 4"
          :key="i"
          class="flex items-center justify-between px-4 py-3 animate-pulse"
        >
          <div class="flex flex-col gap-2">
            <div class="h-3 w-32 rounded bg-(--border)" />
            <div class="h-2 w-20 rounded bg-(--border)" />
          </div>
          <div class="flex flex-col items-end gap-2">
            <div class="h-5 w-16 rounded-md bg-(--border)" />
            <div class="h-2 w-24 rounded bg-(--border)" />
          </div>
        </div>
      </div>
      <span class="sr-only">Loading reorder reminders</span>
    </template>

    <!-- Empty state -->
    <div v-else-if="!reorderReminders.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
      All products are up to date
    </div>

    <!-- Reminder list -->
    <div v-else class="divide-y divide-(--border)">
      <div
        v-for="item in reorderReminders"
        :key="item.product_name"
        class="flex items-center justify-between px-4 py-3 hover:bg-(--background) transition-colors"
      >
        <div>
          <p class="text-sm font-medium text-(--text-primary)">{{ item.product_name }}</p>
          <p class="text-xs text-(--text-muted) mt-0.5">{{ item.category }}</p>
        </div>
        <div class="text-right shrink-0 ml-3">
          <span
            class="text-xs font-semibold px-2 py-1 rounded-md inline-block"
            :class="urgencyClass(item.days_since_last_purchase)"
          >
            {{ item.days_since_last_purchase }}d ago
          </span>
          <p class="text-[10px] text-(--text-muted) mt-1">Last: {{ formatDate(item.last_purchased) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'

const store = useDashboardStore()
const loading = computed(() => store.loading)
const reorderReminders = computed(() => store.reorderReminders)

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}

// Urgency levels:
// < 14 days  → yellow (mild warning)
// 14–29 days → orange (moderate)
// 30+ days   → red (critical)
function urgencyClass(days: number): string {
  if (days >= 30) return 'bg-red-500/10 text-red-400'
  if (days >= 14) return 'bg-orange-500/10 text-orange-400'
  return 'bg-yellow-500/10 text-yellow-400'
}
</script>