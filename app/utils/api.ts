export const apiClient = () => {
    const config = useRuntimeConfig()  
    const token: Ref<string | undefined> = useCookie('auth_token')

    // default headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    // add token if it exists
    if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
    }

    // handle 401 globally
    const onResponseError = ({ response }: any) => {
    if (response?.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
    }
    }

    // return object ready for $fetch
    return {
        baseURL: config.public.baseURL,
        headers,
        onResponseError,
    }
}

/*

**Step by step:**

1. Reads `baseURL` from your `.env` via `runtimeConfig`
2. Reads the auth token from a cookie called `auth_token` — persists across page refreshes and works with SSR
3. Sets default headers for every request
4. If token exists, attaches it as a Bearer token for protected routes
5. Returns `baseURL` + `headers` as an object you spread into `$fetch`

*/