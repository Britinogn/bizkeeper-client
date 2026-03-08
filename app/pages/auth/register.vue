<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background-color: #0F0F0F;">

    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight text-white">
          Biz<span class="text-blue-500">Keeper</span>
        </NuxtLink>
        <p class="text-sm text-[#888] mt-2">Create your account</p>
      </div>

      <!-- Card -->
      <div class="rounded-2xl p-8 border border-[#2A2A2A]" style="background-color: #1A1A1A;">

        <!-- Error -->
        <div v-if="error" class="mb-5 px-4 py-3 rounded-lg text-sm text-red-400 border border-red-500/20 bg-red-500/10">
          {{ error }}
        </div>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <!-- Name row -->
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-[#888]">First name</label>
              <input
                v-model="form.first_name"
                type="text"
                placeholder="John"
                required
                class="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-colors"
                style="background-color: #0F0F0F; border: 1px solid #2A2A2A;"
                @focus="($event.target as HTMLInputElement).style.borderColor = '#2563EB'"
                @blur="($event.target as HTMLInputElement).style.borderColor = '#2A2A2A'"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-[#888]">Last name</label>
              <input
                v-model="form.last_name"
                type="text"
                placeholder="Doe"
                required
                class="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none transition-colors"
                style="background-color: #0F0F0F; border: 1px solid #2A2A2A;"
                @focus="($event.target as HTMLInputElement).style.borderColor = '#2563EB'"
                @blur="($event.target as HTMLInputElement).style.borderColor = '#2A2A2A'"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-[#888]">Email address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="info@bizkeeper.com"
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
                placeholder="Min. 8 characters"
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
            class="w-full py-3 rounded-lg text-sm font-medium text-white transition-colors mt-1"
            :style="loading ? 'background-color: #1E3A8A; opacity: 0.6; cursor: not-allowed;' : 'background-color: #1E3A8A;'"
            @mouseenter="!loading && (($event.target as HTMLButtonElement).style.backgroundColor = '#2563EB')"
            @mouseleave="!loading && (($event.target as HTMLButtonElement).style.backgroundColor = '#1E3A8A')"
          >
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="text-center text-xs text-[#888] mt-6">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-blue-500 hover:text-blue-400 transition-colors ml-1">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({ middleware: 'guest', layout: false })

const { loading, error, register } = useAuth()

const showPassword = ref(false)

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})

async function handleRegister() {
  await register(form)
}
</script>