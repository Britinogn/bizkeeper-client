<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-screen-xl mx-auto">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Price History</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Track price changes across all your products</p>
    </div>

    <!-- Chart -->
    <div class="rounded-xl p-4 border border-(--border) bg-(--surface)">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-(--text-primary)">Spending Trend</p>
      </div>
      <div class="h-52">
        <template v-if="loading">
          <div class="h-full rounded-lg bg-(--border) animate-pulse" />
        </template>
        <template v-else-if="hasMonthly">
          <ChartsSpendingLineChart :data="dashboardStore.summary!.spending_by_month" />
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center text-sm text-(--text-muted)">No data yet</div>
        </template>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
        <p class="text-sm font-semibold text-(--text-primary)">Product Price Changes</p>
        <span class="text-xs text-(--text-muted)">{{ priceHistory.length }} products</span>
      </div>

      <!-- Skeleton -->
      <template v-if="loading">
        <div class="divide-y divide-(--border)">
          <div v-for="i in 6" :key="i" class="flex items-center gap-4 px-4 py-3 animate-pulse">
            <div class="h-3 flex-1 rounded bg-(--border)" />
            <div class="h-3 w-24 rounded bg-(--border) hidden sm:block" />
            <div class="h-3 w-24 rounded bg-(--border)" />
            <div class="h-5 w-20 rounded-md bg-(--border)" />
            <div class="h-3 w-24 rounded bg-(--border) hidden sm:block" />
          </div>
        </div>
      </template>

      <!-- Empty -->
      <template v-else-if="!priceHistory.length">
        <div class="px-4 py-12 text-center">
          <TrendingUp :size="32" class="text-(--text-muted) mx-auto mb-3 opacity-40" />
          <p class="text-sm font-medium text-(--text-primary)">No price history yet</p>
          <p class="text-xs text-(--text-muted) mt-1">Start adding purchase sessions to track prices</p>
        </div>
      </template>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-(--border)">
              <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Product</th>
              <!-- Hidden on mobile — Latest + Change tells the story -->
              <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Previous</th>
              <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Latest</th>
              <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Change</th>
              <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Last Purchased</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in priceHistory"
              :key="item.product"
              class="border-b border-(--border) last:border-0 hover:bg-(--background) transition-colors"
            >
              <td class="px-4 py-3 text-sm font-medium text-(--text-primary)">{{ item.product }}</td>

              <td class="px-4 py-3 text-sm text-(--text-muted) text-right font-mono hidden sm:table-cell">
                ₦{{ item.previous_price.toLocaleString() }}
              </td>

              <td class="px-4 py-3 text-sm text-(--text-primary) text-right font-mono">
                ₦{{ item.latest_price.toLocaleString() }}
              </td>

              <td class="px-4 py-3 text-right">
                <span
                  class="text-xs font-semibold font-mono px-2 py-1 rounded-md whitespace-nowrap inline-block"
                  :class="item.change > 0
                    ? 'bg-red-500/10 text-red-400'
                    : item.change < 0
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-(--background) text-(--text-muted)'"
                >
                  {{ formatChange(item.change, item.previous_price) }}
                </span>
              </td>

              <td class="px-4 py-3 text-sm text-(--text-muted) text-right hidden sm:table-cell">
                {{ formatDate(item.last_purchased) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import dayjs from 'dayjs'

const { loading, priceHistory, fetchPriceHistory } = useDashboard()
const dashboardStore = useDashboardStore()

const hasMonthly = computed(() => !!dashboardStore.summary?.spending_by_month?.length)

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}

// Correct sign placement + percentage: e.g. +₦2,000 (8%) or -₦500 (3%)
function formatChange(change: number, previousPrice: number): string {
  if (change === 0) return '—'
  const sign = change > 0 ? '+' : '-'
  const absAmount = Math.abs(change).toLocaleString()
  const pct = previousPrice > 0
    ? Math.abs(Math.round((change / previousPrice) * 100))
    : null
  return pct != null ? `${sign}₦${absAmount} (${pct}%)` : `${sign}₦${absAmount}`
}

onMounted(async () => {
  await fetchPriceHistory()
})
</script>