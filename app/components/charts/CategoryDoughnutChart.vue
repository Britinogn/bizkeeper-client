<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import type { CategorySpending } from '~/types'

const props = defineProps<{
  data: CategorySpending[]
}>()

const colors = [
  '#2563EB', '#7C3AED', '#059669', '#D97706',
  '#DC2626', '#0891B2', '#65A30D', '#DB2777',
]

const chartData = computed(() => ({
  labels: props.data.map(d => d.category),
  datasets: [
    {
      data: props.data.map(d => d.total),
      backgroundColor: colors.slice(0, props.data.length),
      borderColor: '#1A1A1A',
      borderWidth: 2,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#888888',
        font: { size: 11 },
        padding: 16,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => ` ₦${ctx.raw.toLocaleString()}`,
      },
    },
  },
}
</script>