import { defineStore } from 'pinia'
import type { PurchaseSession, CreatePurchaseSessionPayload, PaginatedSessions, ApiResponse } from '~/types'

export const usePurchasesStore = defineStore('purchases', () => {
  // state
  const sessions = ref<PurchaseSession[]>([])
  const currentSession = ref<PurchaseSession | null>(null)
  const meta = ref({ total: 0, limit: 10, offset: 0, has_more: false })
  const loading = ref(false)

  // fetch paginated sessions
  const fetchSessions = async (limit = 10, offset = 0) => {
    loading.value = true
    try {
      const response = await $fetch<ApiResponse<PaginatedSessions>>('/purchases', {
        ...apiClient(),
        params: { limit, offset },
      })
      sessions.value = response.data.sessions
      meta.value = response.data.meta
    } finally {
      loading.value = false
    }
  }

  // fetch single session
  const fetchSession = async (id: string) => {
    const response = await $fetch<ApiResponse<PurchaseSession>>(`/purchases/${id}`, {
      ...apiClient(),
    })
    currentSession.value = response.data
  }

  // create session with product items
  const createSession = async (payload: CreatePurchaseSessionPayload) => {
    const response = await $fetch<ApiResponse<PurchaseSession>>('/purchases', {
      ...apiClient(),
      method: 'POST',
      body: payload,
    })
    sessions.value.unshift(response.data)
    meta.value.total += 1
  }

  // update session
  const updateSession = async (id: string, payload: CreatePurchaseSessionPayload) => {
    const response = await $fetch<ApiResponse<PurchaseSession>>(`/purchases/${id}`, {
      ...apiClient(),
      method: 'PUT',
      body: payload,
    })
    const index = sessions.value.findIndex(s => s.id === id)
    if (index !== -1) sessions.value[index] = response.data
    if (currentSession.value?.id === id) currentSession.value = response.data
  }

  // delete session
  const deleteSession = async (id: string) => {
    await $fetch(`/purchases/${id}`, {
      ...apiClient(),
      method: 'DELETE',
    })
    sessions.value = sessions.value.filter(s => s.id !== id)
    meta.value.total -= 1
  }

  return {
    sessions, currentSession, meta, loading,
    fetchSessions, fetchSession, createSession, updateSession, deleteSession,
  }
})