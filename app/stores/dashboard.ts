import { defineStore } from 'pinia'
import type { DashboardSummary, PriceHistory, ReorderReminder, AdminStats, ApiResponse } from '~/types'

export const useDashboardStore = defineStore('dashboard', () => {
  // state
  const summary = ref<DashboardSummary | null>(null)
  const priceHistory = ref<PriceHistory[]>([])
  const reorderReminders = ref<ReorderReminder[]>([])
  const adminStats = ref<AdminStats | null>(null)
  const loading = ref(false)

  // fetch dashboard summary
  const fetchSummary = async () => {
    loading.value = true
    try {
      const response = await $fetch<ApiResponse<DashboardSummary>>('/dashboard/summary', {
        ...apiClient(),
      })
      summary.value = response.data
    } finally {
      loading.value = false
    }
  }

  // fetch price history
  const fetchPriceHistory = async () => {
    const response = await $fetch<ApiResponse<PriceHistory[]>>('/dashboard/price-history', {
      ...apiClient(),
    })
    priceHistory.value = response.data
  }

  // fetch reorder reminders
  const fetchReorderReminders = async () => {
    const response = await $fetch<ApiResponse<ReorderReminder[]>>('/dashboard/reorder-reminders', {
      ...apiClient(),
    })
    reorderReminders.value = response.data
  }

  // fetch admin stats — admin only
  const fetchAdminStats = async () => {
    const response = await $fetch<ApiResponse<AdminStats>>('/dashboard/admin', {
      ...apiClient(),
    })
    adminStats.value = response.data
  }

  return {
    summary, priceHistory, reorderReminders, adminStats, loading,
    fetchSummary, fetchPriceHistory, fetchReorderReminders, fetchAdminStats,
  }
})