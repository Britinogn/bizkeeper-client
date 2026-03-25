<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div class="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-(--border) bg-(--surface) shadow-2xl">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-(--border) shrink-0">
          <h2 class="text-sm font-semibold text-(--text-primary)">
            {{ isEdit ? 'Edit Session' : 'New Purchase Session' }}
          </h2>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-(--background) transition-colors"
            @click="emit('close')"
          >
            <X :size="16" class="text-(--text-muted)" />
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">

          <!-- Session fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-(--text-muted)">Supplier Name <span class="text-red-400">*</span></label>
              <input
                v-model="form.supplier_name"
                type="text"
                placeholder="e.g. Alaba Market"
                class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-(--text-muted)">Purchase Date <span class="text-red-400">*</span></label>
              <input
                v-model="form.purchase_date"
                type="date"
                class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors appearance-none"
                style="color-scheme: dark; min-height: 36px;"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-(--text-muted)">Payment Method <span class="text-red-400">*</span></label>
              <select
                v-model="form.payment_method"
                class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) focus:outline-none focus:border-(--primary-hover) transition-colors"
              >
                <option value="">Select method</option>
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
                <option value="credit">Credit</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-(--text-muted)">Invoice Reference (optional)</label>
              <input
                v-model="form.invoice_reference"
                type="text"
                placeholder="e.g. INV-0042"
                class="h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
              />
            </div>

            <div class="flex flex-col gap-1.5 sm:col-span-2">
              <label class="text-xs font-medium text-(--text-muted)">Notes</label>
              <textarea
                v-model="form.notes"
                rows="2"
                placeholder="Optional notes..."
                class="px-3 py-2 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors resize-none"
              />
            </div>
          </div>

          <!-- Product items -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <p class="text-xs font-semibold text-(--text-primary) uppercase tracking-wide">Product Items</p>
              <button
                class="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 transition-colors"
                @click="addItem"
              >
                <Plus :size="13" />
                Add Item
              </button>
            </div>

            <div class="flex flex-col gap-2">
              <div
                v-for="(item, index) in form.items"
                :key="index"
                class="grid grid-cols-12 gap-2 items-start"
              >
                <!-- Name -->
                <div class="col-span-12 sm:col-span-4">
                  <input
                    v-model="item.name"
                    type="text"
                    placeholder="Product name"
                    class="w-full h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
                  />
                </div>

                <!-- Category: auto-lowercased on input -->
                <div class="col-span-6 sm:col-span-2">
                  <input
                    :value="item.category"
                    @input="item.category = ($event.target as HTMLInputElement).value.toLowerCase()"
                    type="text"
                    placeholder="category"
                    class="w-full h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
                  />
                </div>

                <!-- Quantity -->
                <div class="col-span-3 sm:col-span-2">
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    placeholder="Qty"
                    min="1"
                    class="w-full h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
                  />
                </div>

                <!-- Unit price -->
                <div class="col-span-3 sm:col-span-2">
                  <input
                    v-model.number="item.unit_price"
                    type="number"
                    placeholder="Price"
                    min="0"
                    class="w-full h-9 px-3 rounded-lg border border-(--border) bg-(--background) text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--primary-hover) transition-colors"
                  />
                </div>

                <!-- Subtotal -->
                <div class="col-span-10 sm:col-span-1 flex items-center">
                  <span class="text-xs font-mono text-blue-500">
                    ₦{{ ((item.quantity || 0) * (item.unit_price || 0)).toLocaleString() }}
                  </span>
                </div>

                <!-- Remove -->
                <div class="col-span-2 sm:col-span-1 flex items-center justify-end">
                  <button
                    class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-400 transition-colors disabled:opacity-30"
                    :disabled="form.items.length === 1"
                    @click="removeItem(index)"
                  >
                    <Trash2 :size="13" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-(--border) flex items-center justify-between shrink-0">
          <div>
            <p class="text-xs text-(--text-muted)">Total</p>
            <p class="text-lg font-bold font-mono text-(--text-primary)">₦{{ grandTotal.toLocaleString() }}</p>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="h-9 px-4 rounded-lg text-sm text-(--text-muted) hover:text-(--text-primary) hover:bg-(--background) border border-(--border) transition-colors"
              @click="emit('close')"
            >
              Cancel
            </button>
            <button
              class="h-9 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50"
              :disabled="loading || !isValid"
              @click="handleSubmit"
            >
              {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { X, Plus, Trash2 } from 'lucide-vue-next'
import type { PurchaseSession } from '~/types'
import dayjs from 'dayjs'

const props = defineProps<{
  session?: PurchaseSession | null
  loading?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: any]
}>()

const isEdit = computed(() => !!props.session)

const defaultItem = () => ({
  name: '',
  category: '',
  quantity: 1,
  unit_price: 0,
  notes: '',
})

const form = reactive({
  supplier_name: '',
  purchase_date: dayjs().format('YYYY-MM-DD'),
  payment_method: '',
  invoice_reference: '',
  notes: '',
  items: [defaultItem()],
})

// Populate form when editing
watch(() => props.session, (session) => {
  if (session) {
    form.supplier_name = session.supplier_name
    form.purchase_date = dayjs(session.purchase_date).format('YYYY-MM-DD')
    form.payment_method = session.payment_method
    form.invoice_reference = session.invoice_reference ?? ''
    form.notes = session.notes ?? ''
    form.items = session.product_items.map(i => ({
      name: i.name,
      category: i.category.toLowerCase(), // normalize on load too
      quantity: i.quantity,
      unit_price: i.unit_price,
      notes: i.notes ?? '',
    }))
  }
}, { immediate: true })

function addItem() {
  form.items.push(defaultItem())
}

function removeItem(index: number) {
  if (form.items.length > 1) form.items.splice(index, 1)
}

const grandTotal = computed(() =>
  form.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unit_price || 0), 0)
)

const isValid = computed(() =>
  form.supplier_name.trim() &&
  form.purchase_date &&
  form.payment_method &&
  form.items.every(i => i.name.trim() && i.quantity > 0 && i.unit_price > 0)
)

function handleSubmit() {
  if (!isValid.value) return
  emit('submit', {
    supplier_name: form.supplier_name,
    purchase_date: new Date(form.purchase_date).toISOString(),
    payment_method: form.payment_method,
    invoice_reference: form.invoice_reference || undefined,
    notes: form.notes || undefined,
    product_items: form.items,
  })
}
</script>

<style scoped>
input[type="date"] {
  color: var(--text-primary);
  background-color: var(--background);
}
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
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.5;
  filter: invert(1);
  cursor: pointer;
}
</style>