<template>
  <div class="flex flex-col gap-5">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-semibold text-(--text-primary)">Purchase Sessions</h2>
        <p class="text-xs text-(--text-muted) mt-0.5">{{ meta?.total ?? 0 }} total sessions</p>
      </div>
      <button
        class="h-9 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2 disabled:opacity-50"
        :disabled="submitting"
        @click="openCreate"
        aria-label="Create new purchase session"
      >
        <Plus :size="15" />
        New Session
      </button>
    </div>

    <!-- Filters -->
    <PurchasesPurchaseFilters
      :filters="filters"
      @update:filters="filters = $event"
      @clear="clearFilters"
    />

    <!-- Table / Skeleton -->
    <PurchasesPurchaseTable
      :sessions="filteredSessions"
      :search="filters.search"
      :loading="loading"
      empty-message="No sessions found"
      @edit="openEdit"
      @delete="openDelete"
    />

    <!-- Pagination -->
    <div v-if="meta && meta.total > limit" class="flex items-center justify-between">
      <p class="text-xs text-(--text-muted)">
        Showing {{ offset + 1 }}–{{ Math.min(offset + limit, meta.total) }} of {{ meta.total }}
      </p>
      <div class="flex items-center gap-2">
        <button
          class="h-8 px-3 rounded-lg border border-(--border) text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface) transition-colors disabled:opacity-40"
          :disabled="offset === 0"
          @click="prevPage"
          aria-label="Previous page"
        >
          <ChevronLeft :size="14" />
        </button>
        <span class="text-xs text-(--text-muted)">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="h-8 px-3 rounded-lg border border-(--border) text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface) transition-colors disabled:opacity-40"
          :disabled="!hasMore"
          @click="nextPage"
          aria-label="Next page"
        >
          <ChevronRight :size="14" />
        </button>
      </div>
    </div>

  </div>

  <!-- Create / Edit modal -->
  <PurchasesModalPurchaseModal
    v-if="showModal"
    :session="selectedSession"
    :loading="submitting"
    @close="closeModal"
    @submit="handleSubmit"
  />

  <!-- Delete modal -->
  <PurchasesModalPurchaseDeleteModal
    v-if="showDeleteModal"
    :session="selectedSession"
    :loading="deleting"
    @close="closeDeleteModal"
    @confirm="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import dayjs from 'dayjs'
import type { PurchaseSession } from '~/types'
import type { PurchaseFiltersState } from '~/components/purchases/PurchaseFilters.vue'

const store = usePurchasesStore()
const { fetchSessions, createSession, updateSession, deleteSession } = usePurchases()

// Pagination
const limit = 10
const offset = ref(0)
const currentPage = computed(() => Math.floor(offset.value / limit) + 1)
const totalPages = computed(() => Math.ceil((meta.value?.total ?? 0) / limit))
const hasMore = computed(() => (offset.value + limit) < (meta.value?.total ?? 0))

// State
const loading = computed(() => store.loading)
const submitting = ref(false)
const deleting = ref(false)
const sessions = computed(() => store.sessions)
const meta = computed(() => store.meta)

// Filters
const filters = ref<PurchaseFiltersState>({
  search: '',
  payment_method: '',
  date_from: '',
  date_to: '',
})

// Filtered sessions
const filteredSessions = computed(() => {
  let result = sessions.value

  // search filter
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase().trim()

    result = result.filter((s) => {
      // Search in supplier name
      if (s.supplier_name.toLowerCase().includes(q)) return true

      // Search in any product name inside the session
      return s.product_items?.some((item: any) =>
        item.name?.toLowerCase().includes(q)
      )
    })
  }

  // if (filters.value.search) {
  //   const q = filters.value.search.toLowerCase().trim()
  //   result = result.filter((s) => {
  //     if (s.supplier_name.toLowerCase().includes(q)) return true
  //     return s.product_items?.some((item: any) =>
  //       item.name?.toLowerCase().includes(q)
  //     )
  //   })
  // }

  /*
  const q = filters.value.search?.toLowerCase().trim()
  return sessions.value
    .map((s) => {
      if (!q) return s // no search, keep entire session

      // Check if supplier matches
      const supplierMatch = s.supplier_name.toLowerCase().includes(q)

      // Filter products that match the search
      const matchingProducts = s.product_items?.filter((item) =>
        item.name.toLowerCase().includes(q)
      ) || []

      // If nothing matches, skip this session
      if (!supplierMatch && matchingProducts.length === 0) return null

      // Return a session object with filtered products
      return { ...s, product_items: supplierMatch ? s.product_items : matchingProducts }
    })
    .filter(Boolean) as PurchaseSession[]

    */

  // payment method filter
  if (filters.value.payment_method) {
    result = result.filter(s => s.payment_method === filters.value.payment_method)
  }

  // date filters
  if (filters.value.date_from) {
    result = result.filter(s => dayjs(s.purchase_date).isAfter(dayjs(filters.value.date_from).subtract(1, 'day')))
  }
  if (filters.value.date_to) {
    result = result.filter(s => dayjs(s.purchase_date).isBefore(dayjs(filters.value.date_to).add(1, 'day')))
  }

  return result
})

// reset pagination when filters change
// watch(filters, () => { offset.value = 0 })

// Watch search specifically and call the API
watch(() => filters.value.search, (search) => {
  offset.value = 0
  fetchSessions(limit, 0, search)
})

// Keep the existing watch for pagination reset on other filters
watch(() => [filters.value.payment_method, filters.value.date_from, filters.value.date_to], () => {
  offset.value = 0
})

function clearFilters() {
  filters.value = { search: '', payment_method: '', date_from: '', date_to: '' }
}

// Modals
const showModal = ref(false)
const showDeleteModal = ref(false)
const selectedSession = ref<PurchaseSession | null>(null)

function openCreate() {
  selectedSession.value = null
  showModal.value = true
}

function openEdit(session: PurchaseSession) {
  selectedSession.value = session
  showModal.value = true
}

function openDelete(session: PurchaseSession) {
  selectedSession.value = session
  showDeleteModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedSession.value = null
}

function closeDeleteModal() {
  showDeleteModal.value = false
  selectedSession.value = null
}

// Actions
async function handleSubmit(payload: any) {
  submitting.value = true
  try {
    if (selectedSession.value) {
      await updateSession(selectedSession.value.id, payload)
    } else {
      await createSession(payload)
    }
    closeModal()
    await fetchSessions(limit, offset.value, filters.value.search)
  } finally {
    submitting.value = false
  }
}

async function handleDelete() {
  if (!selectedSession.value) return
  deleting.value = true
  try {
    await deleteSession(selectedSession.value.id)
    closeDeleteModal()
    await fetchSessions(limit, offset.value, filters.value.search)
  } finally {
    deleting.value = false
  }
}

async function nextPage() {
  if (!hasMore.value) return
  offset.value += limit
  await fetchSessions(limit, offset.value, filters.value.search)
}

async function prevPage() {
  offset.value = Math.max(0, offset.value - limit)
  await fetchSessions(limit, offset.value, filters.value.search)
}

// initial fetch
onMounted(() => fetchSessions(limit, 0))
</script>