<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-9999 flex flex-col gap-2 w-80">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm"
          :class="styles[toast.type].wrapper"
        >
          <component :is="styles[toast.type].icon" :size="16" class="shrink-0 mt-0.5" :class="styles[toast.type].iconColor" />
          <p class="text-sm flex-1 leading-snug" :class="styles[toast.type].text">{{ toast.message }}</p>
          <button
            class="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            :class="styles[toast.type].text"
            @click="remove(toast.id)"
          >
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const styles = {
  success: {
    wrapper: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400',
    text: 'text-green-300',
    icon: CheckCircle,
  },
  error: {
    wrapper: 'bg-red-500/10 border-red-500/20',
    iconColor: 'text-red-400',
    text: 'text-red-300',
    icon: XCircle,
  },
  info: {
    wrapper: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400',
    text: 'text-blue-300',
    icon: Info,
  },
  warning: {
    wrapper: 'bg-orange-500/10 border-orange-500/20',
    iconColor: 'text-orange-400',
    text: 'text-orange-300',
    icon: AlertTriangle,
  },
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>