<template>
  <div class="min-h-screen bg-(--background) flex items-center justify-center px-8 py-15">
    <div class="w-full max-w-md">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="text-5xl mb-3">☕</div>
        <p class="mt-2 text-(--text-muted) leading-relaxed">
          BizKeeper is completely free.<br>
          If it helps your business, a small coffee can support future updates ❤️
        </p>
        <p class="text-xs mt-3 text-blue-500 font-medium">Thank you, from a builder in Lagos 🇳🇬</p>
      </div>

      <!-- Bank Transfer Card -->
      <div class="bg-(--surface) border border-(--border) rounded-3xl p-6 shadow-sm mb-6">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Building2 :size="20" class="text-green-500" />
            </div>
            <div>
              <p class="font-semibold text-(--text-primary)">Bank Transfer (Nigeria)</p>
              <p class="text-xs text-(--text-muted)">Instant • All banks</p>
            </div>
          </div>
          <!-- <span class="text-xs px-3 py-1 bg-green-500/10 text-green-500 font-medium rounded-full">Opay / GTB / Zenith etc.</span> -->
        </div>

        <div class="space-y-3">
          <div
            v-for="field in bankDetails"
            :key="field.label"
            class="flex justify-between items-center bg-(--background) border border-(--border) rounded-2xl px-4 py-3.5 group hover:border-green-400 transition-all cursor-pointer"
            @click="copy(field.value, field.label)"
          >
            <div class="flex-1">
              <p class="text-[10px] uppercase tracking-widest text-(--text-muted)">{{ field.label }}</p>
              <p class="font-mono text-sm font-semibold text-(--text-primary)">{{ field.value }}</p>
            </div>
            <button class="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
              :class="copied === field.label ? 'bg-green-500 text-white' : 'bg-(--border) group-hover:bg-green-500/10'">
              <Check v-if="copied === field.label" :size="16" />
              <Copy v-else :size="16" class="text-(--text-muted) group-hover:text-green-500" />
            </button>
          </div>
        </div>

        <p class="text-center text-xs text-(--text-muted) mt-4">Tap any field to copy</p>
      </div>

      <!-- Crypto Card -->
      <div class="bg-(--surface) border border-(--border) rounded-3xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-5">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Wallet :size="20" class="text-blue-500" />
            </div>
            <div>
              <p class="font-semibold text-(--text-primary)">Crypto • Any Network</p>
              <p class="text-xs text-(--text-muted)">USDT • ETH • SOL</p>
            </div>
          </div>
          <span class="text-xs px-3 py-1 bg-blue-500/10 text-blue-500 font-medium rounded-full">Instant</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="wallet in cryptoWallets"
            :key="wallet.label"
            class="flex justify-between items-center bg-(--background) border border-(--border) rounded-2xl px-4 py-3.5 group hover:border-blue-400 transition-all cursor-pointer"
            @click="copy(wallet.address, wallet.label)"
          >
            <div class="flex-1 truncate">
              <p class="text-[10px] uppercase tracking-widest text-(--text-muted)">{{ wallet.label }}</p>
              <p class="font-mono text-xs text-(--text-primary) truncate">{{ wallet.address }}</p>
            </div>
            <button class="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
              :class="copied === wallet.label ? 'bg-green-500 text-white' : 'bg-(--border) group-hover:bg-blue-500/10'">
              <Check v-if="copied === wallet.label" :size="16" />
              <Copy v-else :size="16" class="text-(--text-muted) group-hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>

      <!-- Thank you note -->
      <div class="mt-8 text-center">
        <p class="text-xs text-(--text-muted)">
          Built with love by <a href="https://x.com/britinogn" target="_blank" class="text-blue-500 hover:underline">@britinogn</a><br>
          <!-- Even ₦500 or $1 means the world ❤️ -->
        </p>

        <!-- Optional share buttons -->
        <!-- <div class="flex justify-center gap-4 mt-6">
          <button class="text-xs flex items-center gap-1 text-(--text-muted) hover:text-(--text-primary)">
            🔗 Share
          </button>
          <button class="text-xs flex items-center gap-1 text-(--text-muted) hover:text-(--text-primary)">
            📸 Screenshot & send on WhatsApp
          </button>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Wallet, Copy, Check } from 'lucide-vue-next'

const copied = ref<string | null>(null)

async function copy(value: string, label: string) {
  await navigator.clipboard.writeText(value)
  copied.value = label
  setTimeout(() => copied.value = null, 2200)
}

const bankDetails = [
  { label: 'Bank', value: 'Opay' },
  { label: 'Account Name', value: 'Bright' },
  { label: 'Account Number', value: '6117562138' },
]

const cryptoWallets = [
  { label: 'USDT (Any Network)', address: '0xc3f1b82FBFAE2f9A61e2E512AF197b8c997c4F15' },
  { label: 'ETH', address: '0xc3f1b82FBFAE2f9A61e2E512AF197b8c997c4F15' },
  { label: 'Solana', address: '4M65QgbTQoTSGX4kcaapkGhpZjuM1E5zGyYeSQ6PLak2' },
]
</script>