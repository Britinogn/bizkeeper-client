export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  // redirect to dashboard if already logged in
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})

