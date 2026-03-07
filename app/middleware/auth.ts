export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  // redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})