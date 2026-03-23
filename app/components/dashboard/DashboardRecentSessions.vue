<template>
  <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden"
    role="region"
    aria-label="Recent purchase sessions"
  >
    <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
      <p class="text-sm font-semibold text-(--text-primary)">Recent Sessions</p>
      <NuxtLink to="/dashboard/purchases" 
          class="text-xs text-blue-500 hover:text-blue-400 transition-colors" 
          aria-label="View all sessions"
        >
          View all
      </NuxtLink>
    </div>

    <!-- Skeleton -->
    <template v-if="loading">
      <div class="divide-y divide-(--border)">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 px-4 py-3 animate-pulse"
          aria-hidden="true"
        >
          <div class="h-3 flex-1 rounded bg-(--border)" />
          <div class="h-3 w-24 rounded bg-(--border)" />
          <div class="h-3 w-16 rounded bg-(--border) hidden sm:block" />
          <div class="h-3 w-16 rounded bg-(--border)" />
        </div>
        <span class="sr-only">Loading recent sessions</span>
      </div>
    </template>

    

    <!-- Empty -->
    <div v-else-if="!sessions.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
      <p class="px-4 py-8 text-center text-sm text-(--text-muted)">No sessions yet</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full" aria-label="Recent purchase sessions">
        <thead>
          <tr class="border-b border-(--border)">
            <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Supplier</th>
            <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Date</th>
            <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Payment</th>
            <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="session in sessions"
            :key="session.id"
            class="border-b border-(--border) last:border-0 hover:bg-(--background) transition-colors"
          >
            <td class="px-4 py-3 text-sm font-medium text-(--text-primary)">{{ session.supplier_name }}</td>
            <td class="px-4 py-3 text-sm text-(--text-muted)">{{ formatDate(session.purchase_date) }}</td>
            <td class="px-4 py-3 text-sm text-(--text-muted) hidden sm:table-cell capitalize">{{ session.payment_method }}</td>
            <td class="px-4 py-3 text-sm font-semibold text-right text-blue-500 font-mono">₦{{ session.total_amount.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const store = useDashboardStore()
const loading = computed(() => store.loading)
const sessions = computed(() => store.summary?.recent_sessions ?? [])

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}
</script>