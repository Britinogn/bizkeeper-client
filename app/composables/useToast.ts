export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
}

const toasts = ref<Toast[]>([])

export function useToast() {
  function add(type: ToastType, message: string) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, type, message })
    setTimeout(() => remove(id), 4000)
  }

  function remove(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    success: (message: string) => add('success', message),
    error: (message: string) => add('error', message),
    info: (message: string) => add('info', message),
    warning: (message: string) => add('warning', message),
    remove,
  }
}