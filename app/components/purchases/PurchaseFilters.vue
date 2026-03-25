<template>
  <div class="flex flex-col gap-4">

  <!-- Top row -->
  <div class="flex flex-col sm:flex-row gap-3">

    <!-- Search -->
    <div class="relative flex-1">
      <Search :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
      <input
        :value="filters.search"
        @input="emit('update:filters', { ...filters, search: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Search supplier"
        class="w-full h-10 pl-9 pr-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
      />
    </div>

    <!-- Payment method -->
    <select
      :value="filters.payment_method"
      @change="emit('update:filters', { ...filters, payment_method: ($event.target as HTMLSelectElement).value })"
      class="h-10 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
    >
      <option value="">All payments</option>
      <option value="cash">Cash</option>
      <option value="transfer">Transfer</option>
      <option value="credit">Credit</option>
    </select>

    <!-- Clear -->
    <button
      v-if="hasFilters"
      class="h-10 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-muted) hover:text-(--text-primary) hover:border-(--primary-hover) transition-colors flex items-center gap-1.5 shrink-0"
      @click="emit('clear')"
    >
      <X :size="13" />
      Clear
    </button>

  </div>

  <!-- Date filter -->
  <div class="flex flex-col gap-2">

    <p class="text-xs text-(--text-muted)">Filter by date</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <!-- From -->
      <div class="flex flex-col gap-1">
        <label class="text-xs text-(--text-muted)">From</label>
        <input
          :value="filters.date_from"
          @change="emit('update:filters', { ...filters, date_from: ($event.target as HTMLInputElement).value })"
          type="date"
          class="h-10 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
        />
      </div>

      <!-- To -->
      <div class="flex flex-col gap-1">
        <label class="text-xs text-(--text-muted)">To</label>
        <input
          :value="filters.date_to"
          @change="emit('update:filters', { ...filters, date_to: ($event.target as HTMLInputElement).value })"
          type="date"
          class="h-10 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
        />
      </div>

    </div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

export interface PurchaseFiltersState {
  search: string
  payment_method: string
  date_from: string
  date_to: string
}

const props = defineProps<{
  filters: PurchaseFiltersState
}>()

const emit = defineEmits<{
  'update:filters': [filters: PurchaseFiltersState]
  clear: []
}>()

const hasFilters = computed(() =>
  props.filters.search ||
  props.filters.payment_method ||
  props.filters.date_from ||
  props.filters.date_to
)
</script>