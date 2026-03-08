<template>
  <div class="flex flex-col gap-5 max-w-2xl mx-auto w-full">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Profile</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Manage your personal information</p>
    </div>

    <!-- Avatar -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex items-center gap-4">
      <div class="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white shrink-0">
        {{ initials }}
      </div>
      <div>
        <p class="text-sm font-semibold text-(--text-primary)">{{ store.fullName }}</p>
        <p class="text-xs text-(--text-muted) mt-0.5">{{ store.user?.email }}</p>
        <span class="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 capitalize">
          {{ store.user?.role }}
        </span>
      </div>
    </div>

    <!-- Edit form -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
      <p class="text-sm font-semibold text-(--text-primary)">Edit Information</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-(--text-muted)">First Name</label>
          <input
            v-model="form.first_name"
            type="text"
            placeholder="First name"
            class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-(--text-muted)">Last Name</label>
          <input
            v-model="form.last_name"
            type="text"
            placeholder="Last name"
            class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
          />
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs font-medium text-(--text-muted)">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email address"
            class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
          />
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
        {{ error }}
      </div>

      <!-- Success -->
      <div v-if="success" class="px-3 py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-xs text-green-400">
        Profile updated successfully
      </div>

      <div class="flex justify-end">
        <button
          class="h-9 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50"
          :disabled="loading || !hasChanges"
          @click="handleUpdate"
        >
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <!-- Danger zone -->
    <div class="rounded-xl p-5 border border-red-500/20 bg-(--surface) flex flex-col gap-3">
      <p class="text-sm font-semibold text-red-400">Danger Zone</p>
      <p class="text-xs text-(--text-muted)">Permanently delete your account and all associated data. This cannot be undone.</p>
      <div class="flex justify-end">
        <button
          class="h-9 px-4 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
          @click="showDeleteConfirm = true"
        >
          Delete Account
        </button>
      </div>
    </div>

  </div>

  <!-- Delete account confirm -->
  <Teleport to="body">
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div class="w-full max-w-sm rounded-2xl border border-(--border) bg-(--surface) shadow-2xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-(--border)">
          <h2 class="text-sm font-semibold text-(--text-primary)">Delete Account</h2>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-(--background) transition-colors"
            @click="showDeleteConfirm = false"
          >
            <X :size="16" class="text-(--text-muted)" />
          </button>
        </div>
        <div class="px-6 py-5">
          <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Trash2 :size="20" class="text-red-400" />
          </div>
          <p class="text-sm font-medium text-(--text-primary) mb-1">Are you absolutely sure?</p>
          <p class="text-sm text-(--text-muted)">This will permanently delete your account and all your data. This action cannot be undone.</p>
        </div>
        <div class="px-6 py-4 border-t border-(--border) flex items-center justify-end gap-3">
          <button
            class="h-9 px-4 rounded-lg text-sm text-(--text-muted) hover:text-(--text-primary) border border-(--border) hover:bg-(--background) transition-colors"
            @click="showDeleteConfirm = false"
          >
            Cancel
          </button>
          <button
            class="h-9 px-5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50"
            :disabled="deleting"
            @click="handleDeleteAccount"
          >
            {{ deleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X, Trash2 } from 'lucide-vue-next'

const store = useAuthStore()
const { updateProfile, deleteAccount } = useAuth()

const loading = ref(false)
const deleting = ref(false)
const error = ref<string | null>(null)
const success = ref(false)
const showDeleteConfirm = ref(false)

const form = reactive({
  first_name: store.user?.first_name ?? '',
  last_name: store.user?.last_name ?? '',
  email: store.user?.email ?? '',
})

const initials = computed(() => {
  if (!store.user) return 'U'
  return `${store.user.first_name[0]}${store.user.last_name[0]}`.toUpperCase()
})

const hasChanges = computed(() =>
  form.first_name !== store.user?.first_name ||
  form.last_name !== store.user?.last_name ||
  form.email !== store.user?.email
)

async function handleUpdate() {
  loading.value = true
  error.value = null
  success.value = false
  try {
    await updateProfile({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    })
    success.value = true
    setTimeout(() => { success.value = false }, 3000)
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to update profile.'
  } finally {
    loading.value = false
  }
}

async function handleDeleteAccount() {
  deleting.value = true
  try {
    await deleteAccount()
  } catch (err: any) {
    error.value = err?.data?.message || 'Failed to delete account.'
  } finally {
    deleting.value = false
  }
}
</script>