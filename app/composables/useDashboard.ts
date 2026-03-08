export const useDashboard = () => {
    const store = useDashboardStore()
    const loading = ref(false)
    const error = ref<string | null>(null)

    function clearError() { error.value = null }

    async function fetchSummary() {
            loading.value = true
            clearError()
        try {
            await store.fetchSummary()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load dashboard summary.'
        } finally {
            loading.value = false
        }
    }

    async function fetchPriceHistory() {
            loading.value = true
            clearError()
        try {
            await store.fetchPriceHistory()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load price history.'
        } finally {
            loading.value = false
        }
    }

    async function fetchReorderReminders() {
            loading.value = true
            clearError()
        try {
            await store.fetchReorderReminders()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load reorder reminders.'
        } finally {
            loading.value = false
        }
    }

    async function fetchAdminStats() {
            loading.value = true
            clearError()
        try {
            await store.fetchAdminStats()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load admin stats.'
        } finally {
            loading.value = false
        }
    }

    return {
        // store state
        summary: computed(() => store.summary),
        priceHistory: computed(() => store.priceHistory),
        reorderReminders: computed(() => store.reorderReminders),
        adminStats: computed(() => store.adminStats),
        // local state
        loading,
        error,
        // actions
        fetchSummary,
        fetchPriceHistory,
        fetchReorderReminders,
        fetchAdminStats,
        clearError,
    }
}