<template>
  <div class="flex flex-col gap-6">
    <DashboardSummaryCards />
    <DashboardSpendingCharts />
    <DashboardRecentSessions />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <DashboardPriceHistory />
      <DashboardReorderReminders />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const { fetchSummary, fetchPriceHistory, fetchReorderReminders } = useDashboard()

onMounted(async () => {
  await Promise.all([
    fetchSummary(),
    fetchPriceHistory(),
    fetchReorderReminders(),
  ])
})
</script>