// export default defineNuxtRouteMiddleware(() => {
//   const authStore = useAuthStore()

//   // redirect to dashboard if already logged in
//   if (authStore.isAuthenticated) {
//     return navigateTo('/dashboard')
//   }
// })

export default defineNuxtRouteMiddleware((to) => {
  const store = useAuthStore()
  const authRoutes = ['/auth/login', '/auth/register']
  if (store.isAuthenticated && authRoutes.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})