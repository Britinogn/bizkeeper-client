<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">

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

    <!-- Table Section -->
    <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-(--text-primary)">Product Price Changes</p>
          <span class="text-xs px-2 py-0.5 bg-(--background) text-(--text-muted) rounded-full">
            Sorted by largest change
          </span>
        </div>
        <span class="text-xs text-(--text-muted)">{{ priceHistory.length }} products</span>
      </div>

      <!-- Skeleton -->
      <template v-if="loading">
        <div class="divide-y divide-(--border)">
          <div v-for="i in 6" :key="i" class="flex items-center gap-4 px-4 py-3 animate-pulse">
            <div class="h-3 flex-1 rounded bg-(--border)" />
            <div class="h-3 w-24 rounded bg-(--border)" />
            <div class="h-3 w-24 rounded bg-(--border)" />
            <div class="h-5 w-20 rounded-md bg-(--border)" />
            <div class="h-3 w-24 rounded bg-(--border)" />
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <template v-else-if="!priceHistory.length">
        <div class="px-4 py-12 text-center">
          <TrendingUp :size="32" class="text-(--text-muted) mx-auto mb-3 opacity-40" />
          <p class="text-sm font-medium text-(--text-primary)">No price history yet</p>
          <p class="text-xs text-(--text-muted) mt-1">Start adding purchase sessions to track prices</p>
        </div>
      </template>

      <!-- Scrollable Table with Overlay Hint -->
      <div v-else class="relative">
        <!-- Scroll Overlay Hint (shows on mobile when scrollable) -->
        <div class="absolute right-2 top-4 bottom-4 w-8 pointer-events-none z-10
                    bg-linear-to-l from-(--surface) to-transparent 
                    hidden sm:hidden">
        </div>

        <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-(--border) hover:scrollbar-thumb-(--text-muted)/50">
          <table class="w-full min-w-160"> <!-- min-w ensures horizontal scroll on small screens -->
            <thead>
              <tr class="border-b border-(--border)">
                <th scope="col" class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Product</th>
                <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Previous</th>
                <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Latest</th>
                <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Change</th>
                <th scope="col" class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Last Purchased</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in sortedPriceHistory"
                :key="item.product"
                class="border-b border-(--border) last:border-0 hover:bg-(--background) transition-colors"
              >
                <td class="px-4 py-3 text-sm font-medium text-(--text-primary) whitespace-nowrap">{{ item.product }}</td>

                <td class="px-4 py-3 text-sm text-(--text-muted) text-right font-mono">
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

                <td class="px-4 py-3 text-sm text-(--text-muted) text-right font-mono">
                  {{ formatDate(item.last_purchased) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import dayjs from 'dayjs'

const { loading, priceHistory, fetchPriceHistory } = useDashboard()
const dashboardStore = useDashboardStore()

const hasMonthly = computed(() => !!dashboardStore.summary?.spending_by_month?.length)

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}

// Sort by largest price change (absolute value) - biggest movements on top
const sortedPriceHistory = computed(() => {
  if (!priceHistory.value?.length) return []

  return [...priceHistory.value].sort((a, b) => {
    return Math.abs(b.change) - Math.abs(a.change)
  })
})

// Format change with sign, amount and percentage
function formatChange(change: number, previousPrice: number): string {
  if (change === 0) return '—'

  const sign = change > 0 ? '+' : ''
  const absAmount = Math.abs(change).toLocaleString()
  const pct = previousPrice > 0 
    ? Math.round((change / previousPrice) * 100) 
    : 0

  return `${sign}₦${absAmount} (${pct}%)`
}

onMounted(async () => {
  await fetchPriceHistory()
})
</script>