<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

    <!-- Bar chart -->
    <div class="lg:col-span-2 rounded-xl p-4 border border-(--border) bg-(--surface)">
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
        <div v-else class="h-full flex items-center justify-center text-sm text-(--text-muted)">No data yet</div>
      </div>
    </div>

    <!-- Doughnut chart -->
    <div class="rounded-xl p-4 border border-(--border) bg-(--surface)">
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
        <div v-else class="h-full flex items-center justify-center text-sm text-(--text-muted)">No data yet</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const store = useDashboardStore()
const loading = computed(() => store.loading)
const hasMonthly = computed(() => !!store.summary?.spending_by_month?.length)
const hasCategory = computed(() => !!store.summary?.spending_by_category?.length)
</script>