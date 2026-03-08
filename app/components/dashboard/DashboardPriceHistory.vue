<template>
  <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-(--border)">
      <p class="text-sm font-semibold text-(--text-primary)">Price History</p>
      <span class="text-xs text-(--text-muted)">Latest vs previous</span>
    </div>

    <!-- Skeleton -->
    <template v-if="loading">
      <div class="divide-y divide-(--border)">
        <div v-for="i in 4" :key="i" class="flex items-center gap-4 px-4 py-3 animate-pulse">
          <div class="h-3 flex-1 rounded bg-(--border)" />
          <div class="h-3 w-20 rounded bg-(--border)" />
          <div class="h-3 w-20 rounded bg-(--border)" />
          <div class="h-5 w-16 rounded-md bg-(--border)" />
        </div>
      </div>
    </template>

    <div v-else-if="!priceHistory.length" class="px-4 py-8 text-center text-sm text-(--text-muted)">
      No price history yet
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-(--border)">
            <th class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Product</th>
            <th class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Previous</th>
            <th class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Latest</th>
            <th class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Change</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in priceHistory"
            :key="item.product"
            class="border-b border-(--border) last:border-0 hover:bg-(--background) transition-colors"
          >
            <td class="px-4 py-3 text-sm font-medium text-(--text-primary)">{{ item.product }}</td>
            <td class="px-4 py-3 text-sm text-(--text-muted) text-right font-mono">₦{{ item.previous_price.toLocaleString() }}</td>
            <td class="px-4 py-3 text-sm text-(--text-primary) text-right font-mono">₦{{ item.latest_price.toLocaleString() }}</td>
            <td class="px-4 py-3 text-right">
              <span
                class="text-xs font-semibold font-mono px-2 py-1 rounded-md"
                :class="item.change > 0
                  ? 'bg-red-500/10 text-red-400'
                  : item.change < 0
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-(--background) text-(--text-muted)'"
              >
                {{ item.change > 0 ? '+' : '' }}₦{{ item.change.toLocaleString() }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useDashboardStore()
const loading = computed(() => store.loading)
const priceHistory = computed(() => store.priceHistory)
</script>