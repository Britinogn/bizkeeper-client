<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">

    <!-- Header -->
    <div>
      <h2 class="text-base font-semibold text-(--text-primary)">Export Data</h2>
      <p class="text-xs text-(--text-muted) mt-0.5">Download your purchase history as CSV or PDF</p>
    </div>

    <!-- Error banner -->
    <div
      v-if="errorMsg"
      class="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
    >
      <AlertCircle :size="15" class="shrink-0" />
      {{ errorMsg }}
    </div>

    <!-- Export cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <!-- CSV -->
      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
        <div class="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
          <FileSpreadsheet :size="20" class="text-green-400" />
        </div>
        <div>
          <p class="text-sm font-semibold text-(--text-primary)">Export as CSV</p>
          <p class="text-xs text-(--text-muted) mt-1">Spreadsheet format, compatible with Excel and Google Sheets</p>
        </div>
        <button
          class="h-9 px-4 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-500 transition-colors disabled:opacity-50 flex items-center gap-2 w-fit"
          :disabled="exportType === 'csv'"
          @click="handleExport('csv')"
        >
          <Loader v-if="exportType === 'csv'" :size="14" class="animate-spin" />
          <Download v-else :size="14" />
          {{ exportType === 'csv' ? 'Exporting...' : 'Download CSV' }}
        </button>
      </div>

      <!-- PDF -->
      <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
        <div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
          <FileText :size="20" class="text-red-400" />
        </div>
        <div>
          <p class="text-sm font-semibold text-(--text-primary)">Export as PDF</p>
          <p class="text-xs text-(--text-muted) mt-1">Formatted report, ready to print or share</p>
        </div>
        <button
          class="h-9 px-4 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center gap-2 w-fit"
          :disabled="exportType === 'pdf'"
          @click="handleExport('pdf')"
        >
          <Loader v-if="exportType === 'pdf'" :size="14" class="animate-spin" />
          <Download v-else :size="14" />
          {{ exportType === 'pdf' ? 'Exporting...' : 'Download PDF' }}
        </button>
      </div>

    </div>

    <!-- Range selector -->
    <div class="rounded-xl p-5 border border-(--border) bg-(--surface) flex flex-col gap-4">
      <p class="text-sm font-semibold text-(--text-primary)">Date Range</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="r in ranges"
          :key="r.value"
          class="h-8 px-3 rounded-lg text-xs font-medium border transition-colors"
          :class="selectedRange === r.value
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'border-(--border) text-(--text-muted) hover:text-(--text-primary) hover:border-(--primary-hover) bg-(--background)'"
          @click="selectedRange = r.value"
        >
          {{ r.label }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileSpreadsheet, FileText, Download, AlertCircle, Loader } from 'lucide-vue-next'

const config = useRuntimeConfig()
const token = useCookie<string>('auth_token')

const exportType = ref<'csv' | 'pdf' | null>(null)
const selectedRange = ref('1month')
const errorMsg = ref<string | null>(null)

const ranges = [
  { label: '7 Days', value: '7days' },
  { label: '1 Month', value: '1month' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' },
  { label: '1 Year', value: '1year' },
]

async function handleExport(format: 'csv' | 'pdf') {
  exportType.value = format
  errorMsg.value = null

  try {
    const url = `${config.public.baseURL}/export?format=${format}&range=${selectedRange.value}`
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token.value}` },
    })

    if (!response.ok) throw new Error('Export failed. Please try again.')

    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `bizkeeper-export-${selectedRange.value}.${format}`

    // Append to DOM for Firefox compatibility, then clean up
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  } catch (err: any) {
    errorMsg.value = err?.message ?? 'Something went wrong during export.'
  } finally {
    exportType.value = null
  }
}
</script>