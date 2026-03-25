<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-2xl mx-auto w-full">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Settings</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Manage your account preferences</p>
    </div>

    <!-- Appearance -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
      <p class="text-sm font-semibold text-(--text-primary)">Appearance</p>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-(--text-primary)">Theme</p>
          <p class="text-xs text-(--text-muted) mt-0.5">Switch between dark and light mode</p>
        </div>
        <ThemeThemeToggle />
      </div>
    </div>

    <!-- Change password -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
      <p class="text-sm font-semibold text-(--text-primary)">Change Password</p>

      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-(--text-muted)">Current Password</label>
          <div class="relative">
            <input
              v-model="passwordForm.current_password"
              :type="showCurrent ? 'text' : 'password'"
              placeholder="Enter current password"
              class="w-full h-9 px-3 pr-10 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              @input="passwordError = null"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) transition-colors"
              @click="showCurrent = !showCurrent"
            >
              <Eye v-if="!showCurrent" :size="15" />
              <EyeOff v-else :size="15" />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-(--text-muted)">New Password</label>
          <div class="relative">
            <input
              v-model="passwordForm.new_password"
              :type="showNew ? 'text' : 'password'"
              placeholder="Enter new password"
              class="w-full h-9 px-3 pr-10 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              @input="passwordError = null"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) transition-colors"
              @click="showNew = !showNew"
            >
              <Eye v-if="!showNew" :size="15" />
              <EyeOff v-else :size="15" />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-(--text-muted)">Confirm New Password</label>
          <div class="relative">
            <input
              v-model="passwordForm.confirm_password"
              :type="showConfirm ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full h-9 px-3 pr-10 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              :class="passwordMismatch ? 'border-red-500/50' : ''"
              @input="passwordError = null"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) transition-colors"
              @click="showConfirm = !showConfirm"
            >
              <Eye v-if="!showConfirm" :size="15" />
              <EyeOff v-else :size="15" />
            </button>
          </div>
          <!-- Live mismatch hint -->
          <p v-if="passwordMismatch" class="text-[11px] text-red-400">
            Passwords do not match
          </p>
        </div>
      </div>

      <!-- Error -->
      <div
        v-if="passwordError"
        class="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400"
      >
        <AlertCircle :size="13" class="shrink-0" />
        {{ passwordError }}
      </div>

      <!-- Success -->
      <div
        v-if="passwordSuccess"
        class="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400"
      >
        <CheckCircle :size="13" class="shrink-0" />
        Password updated successfully
      </div>

      <div class="flex justify-end">
        <button
          class="h-9 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50"
          :disabled="passwordLoading || !isPasswordValid"
          @click="handleChangePassword"
        >
          {{ passwordLoading ? 'Updating...' : 'Update Password' }}
        </button>
      </div>
    </div>

    <!-- Account info -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-3">
      <p class="text-sm font-semibold text-(--text-primary)">Account Info</p>
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between py-2 border-b border-(--border)">
          <p class="text-xs text-(--text-muted)">Account ID</p>
          <p class="text-xs font-mono text-(--text-primary)">{{ shortId }}</p>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-(--border)">
          <p class="text-xs text-(--text-muted)">Role</p>
          <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 capitalize">
            {{ store.user?.role }}
          </span>
        </div>
        <div class="flex items-center justify-between py-2">
          <p class="text-xs text-(--text-muted)">Member Since</p>
          <p class="text-xs text-(--text-primary)">{{ formatDate(store.user?.created_at) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-vue-next'
import dayjs from 'dayjs'

const store = useAuthStore()

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const passwordLoading = ref(false)
const passwordError = ref<string | null>(null)
const passwordSuccess = ref(false)

const passwordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

// Only show mismatch hint once the user has typed something in confirm field
const passwordMismatch = computed(() =>
  passwordForm.confirm_password.length > 0 &&
  passwordForm.new_password !== passwordForm.confirm_password
)

const isPasswordValid = computed(() =>
  passwordForm.current_password.trim() &&
  passwordForm.new_password.trim().length >= 6 &&
  passwordForm.new_password === passwordForm.confirm_password
)

// Safe short ID — only appends '...' if the ID is actually longer than 8 chars
const shortId = computed(() => {
  const id = store.user?.id
  if (!id) return '—'
  return id.length > 8 ? `${id.slice(0, 8)}...` : id
})

async function handleChangePassword() {
  passwordLoading.value = true
  passwordError.value = null
  passwordSuccess.value = false
  try {
    await $fetch('/settings/password', {
      ...apiClient(),
      method: 'PUT',
      body: {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      },
    })
    passwordSuccess.value = true
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    setTimeout(() => { passwordSuccess.value = false }, 3000)
  } catch (err: any) {
    passwordError.value = err?.data?.message || 'Failed to update password.'
  } finally {
    passwordLoading.value = false
  }
}

function formatDate(date?: string) {
  if (!date) return '—'
  return dayjs(date).format('MMM D, YYYY')
}
</script>