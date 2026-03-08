import type {CreatePurchaseSessionPayload } from '~/types'

export const usePurchases = () => {
    const store = usePurchasesStore()
    const loading = ref(false)
    const error = ref<string | null>(null)

    function clearError() {error.value = null}

    async function fetchSessions(limit = 10, offset = 0) {
        loading.value = true 
        clearError()

        try {
            await store.fetchSessions(limit, offset)
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load sessions.'
        } finally {
            loading.value = false
        }
    }

    async function fetchSession(id: string) {
        try {
            await store.fetchSession(id)
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to load session.'
        } finally {
            loading.value = false
        }
    }

    async function createSession(payload: CreatePurchaseSessionPayload) {
        loading.value = true
        clearError()
        try {
            await store.createSession(payload)
            useToast().success('Session created successfully')
        } catch (err: any) {
            const msg = err?.data?.message || 'Failed to create session.'
            error.value = msg
            useToast().error(msg)
            throw err
        } finally {
            loading.value = false
        }
    }

    async function updateSession(id: string, payload: CreatePurchaseSessionPayload) {
    loading.value = true
    clearError()
    try {
        await store.updateSession(id, payload)
        useToast().success('Session updated successfully')
    } catch (err: any) {
        const msg = err?.data?.message || 'Failed to update session.'
        error.value = msg
        useToast().error(msg)
        throw err
    } finally {
        loading.value = false
    }
    }

    async function deleteSession(id: string) {
    loading.value = true
    clearError()
    try {
        await store.deleteSession(id)
        useToast().success('Session deleted successfully')
    } catch (err: any) {
        const msg = err?.data?.message || 'Failed to delete session.'
        error.value = msg
        useToast().error(msg)
        throw err
    } finally {
        loading.value = false
    }
    }

    return {
        // store state
        sessions: computed(() => store.sessions),
        currentSession: computed(() => store.currentSession),
        meta: computed(() => store.meta),
        // local state
        loading,
        error,
        // actions
        fetchSessions,
        fetchSession,
        createSession,
        updateSession,
        deleteSession,
        clearError,
    }
}
