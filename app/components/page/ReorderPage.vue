<template>
  <div class="flex flex-col gap-5">

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
            <div class="flex flex-col gap-2">
              <div class="h-3 w-32 rounded bg-(--border)" />
              <div class="h-2 w-20 rounded bg-(--border)" />
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="h-6 w-20 rounded-md bg-(--border)" />
              <div class="h-2 w-28 rounded bg-(--border)" />
            </div>
          </div>
        </div>
      </template>

      <!-- Empty -->
      <div v-else-if="!reorderReminders.length" class="px-4 py-12 text-center">
        <CheckCircle :size="32" class="text-green-400 mx-auto mb-3 opacity-60" />
        <p class="text-sm font-medium text-(--text-primary)">All caught up</p>
        <p class="text-xs text-(--text-muted) mt-1">No products need reordering right now</p>
      </div>

      <!-- Items -->
      <div v-else class="divide-y divide-(--border)">
        <div
          v-for="item in reorderReminders"
          :key="item.product_name"
          class="flex items-center justify-between px-4 py-4 hover:bg-(--background) transition-colors"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              :class="item.days_since_last_purchase >= 30 ? 'bg-red-500/10' : 'bg-orange-500/10'"
            >
              <AlertTriangle
                :size="16"
                :class="item.days_since_last_purchase >= 30 ? 'text-red-400' : 'text-orange-400'"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-(--text-primary)">{{ item.product_name }}</p>
              <p class="text-xs text-(--text-muted) mt-0.5">{{ item.category }}</p>
            </div>
          </div>
          <div class="text-right">
            <span
              class="text-xs font-semibold px-2 py-1 rounded-md"
              :class="item.days_since_last_purchase >= 30
                ? 'bg-red-500/10 text-red-400'
                : 'bg-orange-500/10 text-orange-400'"
            >
              {{ item.days_since_last_purchase }}d ago
            </span>
            <p class="text-[10px] text-(--text-muted) mt-1">Last: {{ formatDate(item.last_purchased) }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
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

  onMounted(async () => {
    await fetchReorderReminders()
  })
</script>