<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      @click.self="emit('close')"
    >
      <div class="w-full max-w-sm rounded-2xl border border-(--border) bg-(--surface) shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-(--border)">
          <h2 class="text-sm font-semibold text-(--text-primary)">Delete Session</h2>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-(--background) transition-colors"
            @click="emit('close')"
          >
            <X :size="16" class="text-(--text-muted)" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5">
          <div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Trash2 :size="20" class="text-red-400" />
          </div>
          <p class="text-sm font-medium text-(--text-primary) mb-1">Are you sure?</p>
          <p class="text-sm text-(--text-muted)">
            This will permanently delete the session from
            <span class="font-medium text-(--text-primary)">{{ session?.supplier_name ?? '—' }}</span>
            on
            <span class="font-medium text-(--text-primary)">{{ formatDate(session?.purchase_date) }}</span>.
            This action cannot be undone.
          </p>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-(--border) flex items-center justify-end gap-3">
          <button
            class="h-9 px-4 rounded-lg text-sm text-(--text-muted) hover:text-(--text-primary) border border-(--border) hover:bg-(--background) transition-colors"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            class="h-9 px-5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50"
            :disabled="loading"
            @click="emit('confirm')"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { X, Trash2 } from 'lucide-vue-next'
import type { PurchaseSession } from '~/types'
import dayjs from 'dayjs'

defineProps<{
  session?: PurchaseSession | null
  loading?: boolean
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function formatDate(date?: string) {
  if (!date) return '—'
  return dayjs(date).format('MMM D, YYYY')
}
</script>