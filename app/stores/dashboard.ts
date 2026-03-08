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
  // const fetchSummary = async () => {
  //   loading.value = true
  //   try {
  //     const response = await $fetch<ApiResponse<DashboardSummary>>('/dashboard/summary', {
  //       ...apiClient(),
  //     })
  //     summary.value = response.data
  //   } finally {
  //     loading.value = false
  //   }
  // }

  const fetchSummary = async () => {
    const response = await $fetch<ApiResponse<any>>('/dashboard/summary', {
      ...apiClient(),
    })

    const d = response.data
    //const totalSpend = d.by_category?.reduce((sum: number, c: any) => sum + c.total, 0) ?? 0


    summary.value = {
      // total_spend: totalSpend,
      total_spend: d.stats?.total_spend ?? 0,
      total_sessions: d.stats?.total_sessions ?? 0,
      total_products: d.stats?.total_products ?? 0,
      most_bought_category: d.stats?.most_bought_category ?? '',
      most_bought_product: d.stats?.most_bought_product ?? '',
      spending_by_category: d.by_category ?? [],
      spending_by_month: d.by_month ?? [],
      spending_by_supplier: d.by_supplier ?? [],
      recent_sessions: d.recent_sessions ?? [],
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