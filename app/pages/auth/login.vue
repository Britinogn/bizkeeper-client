<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background-color: #0F0F0F;">

    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-2xl font-semibold tracking-tight text-white">
          Biz<span class="text-blue-500">Keeper</span>
        </NuxtLink>
        <p class="text-sm text-[#888] mt-2">Sign in to your account</p>
      </div>

      <!-- Card -->
      <div class="rounded-2xl shadow-xl p-8 border border-[#2A2A2A]" style="background-color: #1A1A1A;">

        <!-- Error -->
        <div v-if="error" class="mb-5 px-4 py-3 rounded-lg text-sm text-red-400 border border-red-500/20 bg-red-500/10">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <!-- Email -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-[#888]">Email address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
              class="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-colors"
              style="background-color: #0F0F0F; border: 1px solid #2A2A2A;"
              @focus="($event.target as HTMLInputElement).style.borderColor = '#2563EB'"
              @blur="($event.target as HTMLInputElement).style.borderColor = '#2A2A2A'"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-[#888]">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="w-full px-3 py-2.5 pr-10 rounded-lg text-sm text-white outline-none transition-colors"
                style="background-color: #0F0F0F; border: 1px solid #2A2A2A;"
                @focus="($event.target as HTMLInputElement).style.borderColor = '#2563EB'"
                @blur="($event.target as HTMLInputElement).style.borderColor = '#2A2A2A'"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white transition-colors"
                @click="showPassword = !showPassword">
                <Eye v-if="!showPassword" :size="16" />
                <EyeOff v-else :size="16" />
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-lg text-sm font-semibold text-white transition-colors mt-1"
            :style="loading ? 'background-color: #1E3A8A; opacity: 0.6; cursor: not-allowed;' : 'background-color: #1E3A8A;'"
            @mouseenter="!loading && (($event.target as HTMLButtonElement).style.backgroundColor = '#2563EB')"
            @mouseleave="!loading && (($event.target as HTMLButtonElement).style.backgroundColor = '#1E3A8A')"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <p class="text-center text-xs text-[#888] mt-6">
          Do not have an account yet?
          <NuxtLink to="/auth/register" class="text-blue-500 hover:text-blue-400 transition-colors ml-1">
            Create an account
          </NuxtLink>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({ middleware: 'guest', layout: false })

const { loading, error, login } = useAuth()

const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  await login(form)
}
</script>