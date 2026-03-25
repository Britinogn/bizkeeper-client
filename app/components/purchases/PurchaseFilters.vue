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
          placeholder="Search supplier or product"
          class="w-full h-11 pl-9 pr-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
        />
      </div>

      <!-- Payment method -->
      <select
        :value="filters.payment_method"
        @change="emit('update:filters', { ...filters, payment_method: ($event.target as HTMLSelectElement).value })"
        class="h-11 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
      >
        <option value="">All payments</option>
        <option value="cash">Cash</option>
        <option value="transfer">Transfer</option>
        <option value="credit">Credit</option>
      </select>

      <!-- Clear -->
      <button
        v-if="hasFilters"
        class="h-11 px-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-muted) hover:text-(--text-primary) hover:border-(--primary-hover) transition-colors flex items-center gap-1.5 shrink-0"
        @click="emit('clear')"
      >
        <X :size="13" />
        Clear
      </button>

    </div>

    <!-- Date filter -->
    <div class="flex flex-col gap-2">

      <p class="text-xs text-(--text-muted)">Filter by date</p>

      <div class="grid grid-cols-2 gap-3">

        <!-- From -->
        <div class="flex flex-col gap-1">
          <label class="text-xs text-(--text-muted)">From</label>
          <div class="relative">
            <CalendarDays :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none z-10" />
            <input
              :value="filters.date_from"
              @change="emit('update:filters', { ...filters, date_from: ($event.target as HTMLInputElement).value })"
              type="date"
              class="w-full h-11 pl-9 pr-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors appearance-none"
              style="color-scheme: dark; min-height: 44px;"
            />
          </div>
        </div>

        <!-- To -->
        <div class="flex flex-col gap-1">
          <label class="text-xs text-(--text-muted)">To</label>
          <div class="relative">
            <CalendarDays :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none z-10" />
            <input
              :value="filters.date_to"
              @change="emit('update:filters', { ...filters, date_to: ($event.target as HTMLInputElement).value })"
              type="date"
              class="w-full h-11 pl-9 pr-3 rounded-lg border border-(--border) bg-(--surface) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors appearance-none"
              style="color-scheme: dark; min-height: 44px;"
            />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, X, CalendarDays } from 'lucide-vue-next'

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

<style scoped>
/* Force date input text to be visible on all mobile browsers */
input[type="date"] {
  color: var(--text-primary);
  background-color: var(--surface);
}

/* Fix Android Chrome — date input text invisible bug */
input[type="date"]::-webkit-datetime-edit {
  color: var(--text-primary);
  padding: 0;
}

input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  color: var(--text-primary);
}

input[type="date"]::-webkit-datetime-edit-text {
  color: var(--text-muted);
  padding: 0 2px;
}

input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field,
input[type="date"]::-webkit-datetime-edit-year-field {
  color: var(--text-primary);
}

/* iOS Safari calendar icon */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.5;
  filter: invert(1);
  cursor: pointer;
}

/* Empty state placeholder color */
input[type="date"]:not([value])::-webkit-datetime-edit {
  color: var(--text-muted);
}
</style>