<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import type { MonthlySpending } from '~/types'

const props = defineProps<{
  data: MonthlySpending[]
}>()

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Monthly Spending',
      data: props.data.map(d => d.total),
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      borderColor: '#2563EB',
      borderWidth: 1,
      borderRadius: 6,
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