import type { LoginPayload, RegisterPayload, UpdateProfilePayload } from '~/types'

export const useAuth = () => {
    const store = useAuthStore()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const toast = useToast() 

    // clear error
    const clearError = () => { error.value = null }

    // async function login(payload:LoginPayload) {
    //     loading.value = true
    //     clearError()
    //     try {
    //         await store.login(payload)
    //     } catch (err: any) {
    //         error.value = err?.data?.message || "Login failed. Please try again"
    //     } finally{
    //         loading.value = false
    //     }
    // }

    async function login(payload: LoginPayload) {
        loading.value = true
        clearError()
        try {
            await store.login(payload)
            toast.success('Welcome back!')
        } catch (err: any) {
            const msg = err?.data?.message || 'Login failed. Please try again'
            error.value = msg
            toast.error(msg)
        } finally {
            loading.value = false
    }
    }

    async function register(payload: RegisterPayload ) {
        loading.value = true
        clearError()
        try {
            await store.register(payload)
            toast.success('Account created successfully!')
        } catch (err: any) {
            const msg = err?.data?.message || 'Registration failed. Please try again'
            error.value = msg
            toast.error(msg)
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
            const msg = err?.data?.message || 'Failed to load profile.'
            error.value = msg
            toast.error(msg)
        } finally{
            loading.value = false
        }
    }

    async function updateProfile(payload: UpdateProfilePayload ) {
        loading.value = true
        clearError()
        try {
            await store.updateProfile(payload)
            toast.success('Profile updated successfully!')
        } catch (err: any) {
            const msg = err?.data?.message || 'Failed to update profile.'
            error.value = msg
            toast.error(msg)
        } finally{
            loading.value = false
        }
    }

    async function deleteAccount() {
        loading.value = true
        clearError()
        try {
            await store.deleteAccount()
            toast.success('Account deleted successfully!')
        } catch (err: any) {
            const msg = err?.data?.message || 'Failed to delete account.'
            error.value = msg
            toast.error(msg)
        } finally{
            loading.value = false
        }
    }

    function logout() {
        store.logout()
        toast.success('Logged out successfully!')
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