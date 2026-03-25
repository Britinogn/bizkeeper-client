<template>
  <div class="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">

    <!-- Skeleton -->
    <template v-if="loading">
      <div class="divide-y divide-(--border)">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4 px-4 py-3 animate-pulse">
          <div class="h-3 flex-1 rounded bg-(--border)" />
          <div class="h-3 w-24 rounded bg-(--border)" />
          <div class="h-3 w-16 rounded bg-(--border) hidden sm:block" />
          <div class="h-3 w-16 rounded bg-(--border)" />
          <div class="h-3 w-10 rounded bg-(--border)" />
        </div>
      </div>
    </template>

    <!-- Empty -->
    <div v-else-if="!sessions.length" class="px-4 py-12 text-center">
      <ShoppingBag :size="32" class="text-(--text-muted) mx-auto mb-3 opacity-40" />
      <p class="text-sm font-medium text-(--text-primary)">No sessions found</p>
      <p class="text-xs text-(--text-muted) mt-1">Create your first purchase session</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-(--border)">
            <th class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider w-8" />

            <!-- Supplier column: default / supplier search -->
            <th
              v-if="!isProductSearch"
              class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider"
            >
              Supplier
            </th>

            <!-- Product column: product search only -->
            <th
              v-if="isProductSearch"
              class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider"
            >
              Product Name
            </th>

            <th class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Date</th>
            <th class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Payment</th>
            <th class="text-left px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider hidden md:table-cell">Items</th>
            <th class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Total</th>
            <th class="text-right px-4 py-2.5 text-[11px] font-medium text-(--text-muted) uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>

          <!-- ── DEFAULT / SUPPLIER SEARCH: one row per session ── -->
          <template v-if="!isProductSearch">
            <template v-for="session in sessions" :key="session.id">

              <tr
                class="border-b border-(--border) hover:bg-(--background) transition-colors cursor-pointer"
                :class="expandedId === session.id ? 'bg-(--background)' : ''"
                @click="toggleExpand(session.id)"
              >
                <td class="px-4 py-3">
                  <ChevronDown
                    :size="14"
                    class="text-(--text-muted) transition-transform duration-200"
                    :class="expandedId === session.id ? 'rotate-180' : ''"
                  />
                </td>
                <td class="px-4 py-3 text-sm font-medium text-(--text-primary)">{{ session.supplier_name }}</td>
                <td class="px-4 py-3 text-sm text-(--text-muted)">{{ formatDate(session.purchase_date) }}</td>
                <td class="px-4 py-3 text-sm text-(--text-muted) hidden sm:table-cell capitalize">{{ session.payment_method }}</td>
                <td class="px-4 py-3 text-sm text-(--text-muted) hidden md:table-cell">{{ session.product_items?.length ?? 0 }} items</td>
                <td class="px-4 py-3 text-sm font-semibold text-right text-blue-500 font-mono">
                  ₦{{ session.total_amount.toLocaleString() }}
                </td>
                <td class="px-4 py-3 text-right" @click.stop>
                  <div class="flex items-center justify-end gap-1">
                    <button
                      class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-500/10 text-(--text-muted) hover:text-blue-400 transition-colors"
                      @click="emit('edit', session)"
                    >
                      <Pencil :size="13" />
                    </button>
                    <button
                      class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-400 transition-colors"
                      @click="emit('delete', session)"
                    >
                      <Trash2 :size="13" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Expanded product items -->
              <tr v-if="expandedId === session.id" class="border-b border-(--border)">
                <td colspan="7" class="px-4 py-3 bg-(--background)">
                  <div class="rounded-lg border border-(--border) overflow-hidden">
                    <table class="w-full">
                      <thead>
                        <tr class="border-b border-(--border)">
                          <th class="text-left px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Product</th>
                          <th class="text-left px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Category</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Qty</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Unit Price</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in session.product_items"
                          :key="item.id"
                          class="border-b border-(--border) last:border-0"
                        >
                          <td class="px-3 py-2 text-xs font-medium text-(--text-primary)">{{ item.name }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) hidden sm:table-cell">{{ item.category }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) text-right">{{ item.quantity }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) text-right font-mono">₦{{ item.unit_price.toLocaleString() }}</td>
                          <td class="px-3 py-2 text-xs font-semibold text-right text-blue-500 font-mono">₦{{ item.subtotal_amount.toLocaleString() }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p v-if="session.notes" class="text-xs text-(--text-muted) mt-2 px-1">
                    <span class="font-medium text-(--text-primary)">Notes:</span> {{ session.notes }}
                  </p>
                </td>
              </tr>

            </template>
          </template>

          <!-- ── PRODUCT SEARCH: one row per matched product item ── -->
          <template v-else>
            <template v-for="session in sessions" :key="session.id">
              <tr
                v-for="(item, index) in matchingItems(session)"
                :key="item.id"
                class="border-b border-(--border) hover:bg-(--background) transition-colors"
              >
                <!-- Chevron: only on first item row of each session, opens expanded view -->
                <td class="px-4 py-3">
                  <ChevronDown
                    v-if="index === 0"
                    :size="14"
                    class="text-(--text-muted) transition-transform duration-200 cursor-pointer"
                    :class="expandedId === session.id ? 'rotate-180' : ''"
                    @click="toggleExpand(session.id)"
                  />
                </td>

                <!-- Product name -->
                <td class="px-4 py-3 text-sm font-medium text-(--text-primary)">{{ item.name }}</td>

                <!-- Date: only on first item row of each session -->
                <td class="px-4 py-3 text-sm text-(--text-muted)">
                  <span v-if="index === 0">{{ formatDate(session.purchase_date) }}</span>
                </td>

                <!-- Payment: only on first item row -->
                <td class="px-4 py-3 text-sm text-(--text-muted) hidden sm:table-cell capitalize">
                  <span v-if="index === 0">{{ session.payment_method }}</span>
                </td>

                <!-- Items count: only on first item row -->
                <td class="px-4 py-3 text-sm text-(--text-muted) hidden md:table-cell">
                  <span v-if="index === 0">{{ session.product_items?.length ?? 0 }} items</span>
                </td>

                <!-- Subtotal for this specific product -->
                <td class="px-4 py-3 text-sm font-semibold text-right text-blue-500 font-mono">
                  ₦{{ item.subtotal_amount.toLocaleString() }}
                </td>

                <!-- Actions: only on first item row -->
                <td class="px-4 py-3 text-right" @click.stop>
                  <div v-if="index === 0" class="flex items-center justify-end gap-1">
                    <button
                      class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-500/10 text-(--text-muted) hover:text-blue-400 transition-colors"
                      @click="emit('edit', session)"
                    >
                      <Pencil :size="13" />
                    </button>
                    <button
                      class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-400 transition-colors"
                      @click="emit('delete', session)"
                    >
                      <Trash2 :size="13" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Expanded product items (still available in product search mode) -->
              <tr v-if="expandedId === session.id" class="border-b border-(--border)">
                <td colspan="7" class="px-4 py-3 bg-(--background)">
                  <div class="rounded-lg border border-(--border) overflow-hidden">
                    <table class="w-full">
                      <thead>
                        <tr class="border-b border-(--border)">
                          <th class="text-left px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Product</th>
                          <th class="text-left px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider hidden sm:table-cell">Category</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Qty</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Unit Price</th>
                          <th class="text-right px-3 py-2 text-[10px] font-medium text-(--text-muted) uppercase tracking-wider">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in session.product_items"
                          :key="item.id"
                          class="border-b border-(--border) last:border-0"
                        >
                          <td class="px-3 py-2 text-xs font-medium text-(--text-primary)">{{ item.name }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) hidden sm:table-cell">{{ item.category }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) text-right">{{ item.quantity }}</td>
                          <td class="px-3 py-2 text-xs text-(--text-muted) text-right font-mono">₦{{ item.unit_price.toLocaleString() }}</td>
                          <td class="px-3 py-2 text-xs font-semibold text-right text-blue-500 font-mono">₦{{ item.subtotal_amount.toLocaleString() }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p v-if="session.notes" class="text-xs text-(--text-muted) mt-2 px-1">
                    <span class="font-medium text-(--text-primary)">Notes:</span> {{ session.notes }}
                  </p>
                </td>
              </tr>

            </template>
          </template>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ShoppingBag, ChevronDown, Pencil, Trash2 } from 'lucide-vue-next'
import type { PurchaseSession } from '~/types'
import dayjs from 'dayjs'

const props = defineProps<{
  sessions: PurchaseSession[]
  loading?: boolean
  search: string
}>()

const emit = defineEmits<{
  edit: [session: PurchaseSession]
  delete: [session: PurchaseSession]
}>()

const expandedId = ref<string | null>(null)

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

function formatDate(date: string) {
  return dayjs(date).format('MMM D, YYYY')
}

// True when the search term matches a product name (not a supplier)
const isProductSearch = computed(() => {
  if (!props.search) return false
  const query = props.search.toLowerCase()
  return props.sessions.some(session =>
    session.product_items?.some(item =>
      item.name.toLowerCase().includes(query)
    )
  )
})

// Returns only the product items that match the search
function matchingItems(session: PurchaseSession) {
  if (!props.search) return []
  const query = props.search.toLowerCase()
  return session.product_items?.filter(item =>
    item.name.toLowerCase().includes(query)
  ) ?? []
}
</script>