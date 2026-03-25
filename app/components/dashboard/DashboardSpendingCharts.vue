<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    <!-- Bar chart — takes up 2/3 on large screens -->
    <div class="md:col-span-1 lg:col-span-2 rounded-xl p-4 border border-(--border) bg-(--surface)">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-(--text-primary)">Monthly Spending</p>
        <span class="text-xs text-(--text-muted)">Last 6 months</span>
      </div>
      <div class="h-52">
        <template v-if="loading">
          <div class="h-full rounded-lg bg-(--border) animate-pulse" />
        </template>
        <template v-else-if="hasMonthly">
          <ChartsSpendingBarChart :data="store.summary!.spending_by_month" />
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center text-sm text-(--text-muted)">No data yet</div>
        </template>
      </div>
    </div>

    <!-- Doughnut chart — takes up 1/3 on large screens -->
    <div class="md:col-span-1 rounded-xl p-4 border border-(--border) bg-(--surface)">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-(--text-primary)">By Category</p>
      </div>
      <div class="h-52">
        <template v-if="loading">
          <div class="h-full w-full flex items-center justify-center">
            <div class="w-40 h-40 rounded-full bg-(--border) animate-pulse" />
          </div>
        </template>
        <template v-else-if="hasCategory">
          <ChartsCategoryDoughnutChart :data="store.summary!.spending_by_category" />
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center text-sm text-(--text-muted)">No data yet</div>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const store = useDashboardStore()
const loading = computed(() => store.loading)
const hasMonthly = computed(() => !!store.summary?.spending_by_month?.length)
const hasCategory = computed(() => !!store.summary?.spending_by_category?.length)
</script>