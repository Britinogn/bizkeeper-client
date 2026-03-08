<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import type { MonthlySpending } from '~/types'

const props = defineProps<{
  data: MonthlySpending[]
}>()

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Spending Trend',
      data: props.data.map(d => d.total),
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      borderWidth: 2,
      pointBackgroundColor: '#2563EB',
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => `₦${ctx.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: '#2A2A2A' },
      ticks: { color: '#888888', font: { size: 11 } },
    },
    y: {
      grid: { color: '#2A2A2A' },
      ticks: {
        color: '#888888',
        font: { size: 11 },
        callback: (val: any) => `₦${(val / 1000).toFixed(0)}k`,
      },
    },
  },
}
</script>