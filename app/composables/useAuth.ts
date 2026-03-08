import type { LoginPayload, RegisterPayload, UpdateProfilePayload } from '~/types'

export const useAuth = () => {
    const store = useAuthStore()
    const loading = ref(false)
    const error = ref<string | null>(null)

    // clear error
    const clearError = () => { error.value = null }

    async function login(payload:LoginPayload) {
        loading.value = true
        clearError()
        try {
            await store.login(payload)
        } catch (err: any) {
            error.value = err?.data?.message || "Login failed. Please try again"
        } finally{
            loading.value = false
        }
    }

    async function register(payload: RegisterPayload ) {
        loading.value = true
        clearError()
        try {
            await store.register(payload)
        } catch (err: any) {
            error.value = err?.data?.message || "Registration failed. Please try again"
        } finally{
            loading.value = false
        }
    }

    async function fetchProfile () {
        loading.value = true 
        clearError()
        try {
            await store.fetchProfile()
        } catch (err: any) {
            error.value = err?.data?.message || "Failed to load profile."
        } finally{
            loading.value = false
        }
    }

    async function updateProfile(payload: UpdateProfilePayload ) {
        loading.value = true
        clearError()
        try {
            await store.updateProfile(payload)
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to update profile.'
        } finally{
            loading.value = false
        }
    }

    async function deleteAccount() {
        loading.value = true
        clearError()
        try {
            await store.deleteAccount()
        } catch (err: any) {
            error.value = err?.data?.message || 'Failed to update profile.'
        } finally{
            loading.value = false
        }
    }

    function logout() {
        store.logout()
    }

    return {
        // store state
        user: computed(() => store.user),
        isAuthenticated: computed(() => store.isAuthenticated),
        isAdmin: computed(() => store.isAdmin),
        fullName: computed(() => store.fullName),
        
        // local state
        loading,
        error,

        // actions
        login,
        register,
        fetchProfile,
        updateProfile,
        deleteAccount,
        logout,
        clearError,
    }

} 