<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Reorder Reminders</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Products that may need restocking soon</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div class="rounded-xl p-4 border border-(--border) bg-(--surface)">
        <p class="text-xs font-medium text-(--text-muted) uppercase tracking-wide mb-2">Total Alerts</p>
        <p class="text-2xl font-bold font-mono text-(--text-primary)">
          <span v-if="loading" class="inline-block h-7 w-12 rounded bg-(--border) animate-pulse" />
          <span v-else>{{ reorderReminders.length }}</span>
        </p>
      </div>
      <div class="rounded-xl p-4 border border-(--border) bg-(--surface)">
        <p class="text-xs font-medium text-(--text-muted) uppercase tracking-wide mb-2">Overdue 30d+</p>
        <p class="text-2xl font-bold font-mono text-red-400">
          <span v-if="loading" class="inline-block h-7 w-12 rounded bg-(--border) animate-pulse" />
          <span v-else>{{ overdueCount }}</span>
        </p>
      </div>
      <div class="rounded-xl p-4 border border-(--border) bg-(--surface) hidden sm:block">
        <p class="text-xs font-medium text-(--text-muted) uppercase tracking-wide mb-2">Categories</p>
        <p class="text-2xl font-bold font-mono text-(--text-primary)">
          <span v-if="loading" class="inline-block h-7 w-12 rounded bg-(--border) animate-pulse" />
          <span v-else>{{ uniqueCategories }}</span>
        </p>
      </div>
    </div>

    <!-- List -->
    <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
        <p class="text-sm font-semibold text-(--text-primary)">Items to Reorder</p>
        <span
          v-if="!loading && reorderReminders.length"
          class="text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/10 text-red-400"
        >
          {{ reorderReminders.length }} items
        </span>
      </div>

      <!-- Skeleton -->
      <template v-if="loading">
        <div class="divide-y divide-(--border)">
          <div v-for="i in 5" :key="i" class="flex items-center justify-between px-4 py-4 animate-pulse">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-(--border) shrink-0" />
              <div class="flex flex-col gap-2">
                <div class="h-3 w-32 rounded bg-(--border)" />
                <div class="h-2 w-20 rounded bg-(--border)" />
              </div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="h-6 w-20 rounded-md bg-(--border)" />
              <div class="h-2 w-28 rounded bg-(--border)" />
            </div>
          </div>
        </div>
      </template>

      <!-- Empty -->
      <template v-else-if="!reorderReminders.length">
        <div class="px-4 py-12 text-center">
          <CheckCircle :size="32" class="text-green-400 mx-auto mb-3 opacity-60" />
          <p class="text-sm font-medium text-(--text-primary)">No reminders yet</p>
          <p class="text-xs text-(--text-muted) mt-1 max-w-xs mx-auto">
            Once you've recorded a purchase session, any product not restocked within 14 days will appear here automatically.
          </p>
          <NuxtLink
            to="/dashboard/purchases"
            class="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-blue-400 hover:underline"
          >
            Add your first session →
          </NuxtLink>
        </div>
      </template>

      <!-- Items -->
      <template v-else>
        <div class="divide-y divide-(--border)">
          <div
            v-for="item in reorderReminders"
            :key="item.product_name"
            class="flex items-center justify-between px-4 py-4 hover:bg-(--background) transition-colors"
          >
            <div class="flex items-center gap-3">
              <!-- Icon with 3-level urgency color -->
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                :class="urgencyIconBg(item.days_since_last_purchase)"
              >
                <AlertTriangle :size="16" :class="urgencyIconColor(item.days_since_last_purchase)" />
              </div>
              <div>
                <p class="text-sm font-medium text-(--text-primary)">{{ item.product_name }}</p>
                <p class="text-xs text-(--text-muted) mt-0.5">{{ item.category }}</p>
              </div>
            </div>

            <div class="text-right shrink-0 ml-3">
              <span
                class="text-xs font-semibold px-2 py-1 rounded-md inline-block"
                :class="urgencyBadge(item.days_since_last_purchase)"
              >
                {{ item.days_since_last_purchase }}d ago
              </span>
              <p class="text-[10px] text-(--text-muted) mt-1">Last: {{ formatDate(item.last_purchased) }}</p>
            </div>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, AlertTriangle } from 'lucide-vue-next'
import dayjs from 'dayjs'

const { loading, reorderReminders, fetchReorderReminders } = useDashboard()

const overdueCount = computed(() =>
  reorderReminders.value.filter(i => i.days_since_last_purchase >= 30).length
)

const uniqueCategories = computed(() =>
  new Set(reorderReminders.value.map(i => i.category)).size
)

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}

// 3-level urgency — consistent with ReorderReminders.vue widget
// < 14d → yellow, 14–29d → orange, 30d+ → red
function urgencyBadge(days: number): string {
  if (days >= 30) return 'bg-red-500/10 text-red-400'
  if (days >= 14) return 'bg-orange-500/10 text-orange-400'
  return 'bg-yellow-500/10 text-yellow-400'
}

function urgencyIconBg(days: number): string {
  if (days >= 30) return 'bg-red-500/10'
  if (days >= 14) return 'bg-orange-500/10'
  return 'bg-yellow-500/10'
}

function urgencyIconColor(days: number): string {
  if (days >= 30) return 'text-red-400'
  if (days >= 14) return 'text-orange-400'
  return 'text-yellow-400'
}

onMounted(async () => {
  await fetchReorderReminders()
})
</script>