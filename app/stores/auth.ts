import { defineStore } from 'pinia'
import type { User, LoginPayload, RegisterPayload, AuthResponse, UpdateProfilePayload, ApiResponse } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(useCookie<string>('auth_token').value ?? null)

  // computed
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const fullName = computed(() =>
    user.value ? `${user.value.first_name} ${user.value.last_name}` : ''
  )

  // save user + token to state and cookie
  const setAuth = (newUser: User, newToken: string) => {
    user.value = newUser
    token.value = newToken
    const cookie = useCookie<string>('auth_token', {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
    })
    cookie.value = newToken
  }

  const login = async (payload: LoginPayload) => {
    const response = await $fetch<ApiResponse<AuthResponse>>('/auth/login', {
      ...apiClient(),
      method: 'POST',
      body: payload,
    })
    setAuth(response.data.user, response.data.token)
    await navigateTo('/dashboard')
  }

  const register = async (payload: RegisterPayload) => {
    const response = await $fetch<ApiResponse<AuthResponse>>('/auth/register', {
      ...apiClient(),
      method: 'POST',
      body: payload,
    })
    setAuth(response.data.user, response.data.token)
    await navigateTo('/dashboard')
  }

  const fetchProfile = async () => {
    const response = await $fetch<ApiResponse<User>>('/settings/profile', {
      ...apiClient(),
    })
    user.value = response.data
  }

  const updateProfile = async (payload: UpdateProfilePayload) => {
    const response = await $fetch<ApiResponse<User>>('/settings/update', {
      ...apiClient(),
      method: 'PUT',
      body: payload,
    })
    user.value = response.data
  }

  const deleteAccount = async () => {
    await $fetch('/settings/delete', {
      ...apiClient(),
      method: 'DELETE',
    })
    logout()
  }

  const logout = () => {
    user.value = null
    token.value = null
    useCookie('auth_token').value = null
    navigateTo('/auth/login')
  }

  // check if token is expired and clear if so
  const checkToken = () => {
    const cookie = useCookie<string>('auth_token')
    if (!cookie.value) {
      user.value = null
      token.value = null
    }
  }

  return {
    user, token, isAuthenticated, isAdmin, fullName,
    login, register, fetchProfile, updateProfile, deleteAccount, logout,
    checkToken,
  }
})