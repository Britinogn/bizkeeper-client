<template>
  <div class="flex flex-col gap-5">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base font-semibold text-(--text-primary)">Purchase Sessions</h2>
        <p class="text-xs text-(--text-muted) mt-0.5">{{ meta?.total ?? 0 }} total sessions</p>
      </div>
      <button
        class="h-9 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2"
        @click="openCreate"
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

    <!-- Table -->
    <PurchasesPurchaseTable
      :sessions="filteredSessions"
      :loading="loading"
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
        >
          <ChevronLeft :size="14" />
        </button>
        <span class="text-xs text-(--text-muted)">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="h-8 px-3 rounded-lg border border-(--border) text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--surface) transition-colors disabled:opacity-40"
          :disabled="!meta.has_more"
          @click="nextPage"
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
import { Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { PurchaseSession } from '~/types'
import type { PurchaseFiltersState } from '~/components/purchases/PurchaseFilters.vue'

const store = usePurchasesStore()
const { fetchSessions, createSession, updateSession, deleteSession } = usePurchases()

const limit = 10
const offset = ref(0)
const loading = computed(() => store.loading)
const submitting = ref(false)
const deleting = ref(false)

const sessions = computed(() => store.sessions)
const meta = computed(() => store.meta)

const currentPage = computed(() => Math.floor(offset.value / limit) + 1)
const totalPages = computed(() => Math.ceil((meta.value?.total ?? 0) / limit))

// filters
const filters = ref<PurchaseFiltersState>({
  search: '',
  payment_method: '',
  date_from: '',
  date_to: '',
})

const filteredSessions = computed(() => {
  let result = sessions.value

  if (filters.value.search) {
    const q = filters.value.search.toLowerCase()
    result = result.filter(s => s.supplier_name.toLowerCase().includes(q))
  }

  if (filters.value.payment_method) {
    result = result.filter(s => s.payment_method === filters.value.payment_method)
  }

  if (filters.value.date_from) {
    result = result.filter(s => s.purchase_date >= filters.value.date_from)
  }

  if (filters.value.date_to) {
    result = result.filter(s => s.purchase_date <= filters.value.date_to)
  }

  return result
})

function clearFilters() {
  filters.value = { search: '', payment_method: '', date_from: '', date_to: '' }
}

// modal state
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

async function handleSubmit(payload: any) {
  submitting.value = true
  try {
    if (selectedSession.value) {
      await updateSession(selectedSession.value.id, payload)
    } else {
      await createSession(payload)
    }
    closeModal()
    await fetchSessions(limit, offset.value)
  } catch {
    // toast already shown in composable
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
    await fetchSessions(limit, offset.value)
  } finally {
    deleting.value = false
  }
}

async function nextPage() {
  offset.value += limit
  await fetchSessions(limit, offset.value)
}

async function prevPage() {
  offset.value = Math.max(0, offset.value - limit)
  await fetchSessions(limit, offset.value)
}

onMounted(async () => {
  await fetchSessions(limit, 0)
})
</script>