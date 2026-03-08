<template>
  <div class="min-h-screen bg-(--background) flex items-center justify-center px-6 py-16">
    <div class="w-full max-w-md">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="text-4xl mb-4">☕</div>
        <h1 class="text-2xl font-bold text-(--text-primary) mb-2">Buy me a coffee</h1>
        <p class="text-sm text-(--text-muted) leading-relaxed max-w-xs mx-auto">
          BizKeeper is free and built with love. If it's helped your business, a coffee keeps me going 🙏
        </p>
      </div>

      <!-- Bank Transfer -->
      <div class="bg-(--surface) border border-(--border) rounded-2xl p-6 mb-4">
        <div class="flex items-center gap-2 mb-5">
          <div class="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
            <Building2 :size="15" class="text-green-400" />
          </div>
          <span class="text-sm font-semibold text-(--text-primary)">Bank Transfer</span>
          <span class="ml-auto text-[11px] font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Nigeria</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="field in bankDetails"
            :key="field.label"
            class="flex items-center justify-between gap-3 bg-(--background) rounded-xl px-4 py-3 group cursor-pointer hover:border-blue-500/40 border border-(--border) transition-colors"
            @click="copy(field.value, field.label)"
          >
            <div>
              <p class="text-[10px] text-(--text-muted) font-medium uppercase tracking-wide mb-0.5">{{ field.label }}</p>
              <p class="text-sm font-mono font-medium text-(--text-primary)">{{ field.value }}</p>
            </div>
            <div class="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              :class="copied === field.label ? 'bg-green-500/15' : 'bg-(--border) group-hover:bg-blue-600/15'">
              <Check v-if="copied === field.label" :size="13" class="text-green-400" />
              <Copy v-else :size="13" class="text-(--text-muted) group-hover:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Crypto Wallet -->
      <div class="bg-(--surface) border border-(--border) rounded-2xl p-6 mb-8">
        <div class="flex items-center gap-2 mb-5">
          <div class="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <Wallet :size="15" class="text-blue-400" />
          </div>
          <span class="text-sm font-semibold text-(--text-primary)">Crypto Wallet</span>
          <span class="ml-auto text-[11px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Any network</span>
        </div>

        <div class="space-y-3">
          <div
            v-for="wallet in cryptoWallets"
            :key="wallet.label"
            class="flex items-center justify-between gap-3 bg-(--background) rounded-xl px-4 py-3 group cursor-pointer hover:border-blue-500/40 border border-(--border) transition-colors"
            @click="copy(wallet.address, wallet.label)"
          >
            <div class="min-w-0">
              <p class="text-[10px] text-(--text-muted) font-medium uppercase tracking-wide mb-0.5">{{ wallet.label }}</p>
              <p class="text-xs font-mono text-(--text-primary) truncate">{{ wallet.address }}</p>
            </div>
            <div class="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              :class="copied === wallet.label ? 'bg-green-500/15' : 'bg-(--border) group-hover:bg-blue-600/15'">
              <Check v-if="copied === wallet.label" :size="13" class="text-green-400" />
              <Copy v-else :size="13" class="text-(--text-muted) group-hover:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-(--text-muted)">
        Built by <a href="https://x.com/britinogn" target="_blank" class="text-blue-400 hover:underline">@britinogn</a> · Any amount is appreciated ❤️
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Wallet, Copy, Check } from 'lucide-vue-next'

const copied = ref<string | null>(null)

async function copy(value: string, label: string) {
  await navigator.clipboard.writeText(value)
  copied.value = label
  setTimeout(() => { copied.value = null }, 2000)
}

// ← Fill in your real details here
const bankDetails = [
  { label: 'Bank Name', value: 'Opay' },
  { label: 'Account Name', value: 'Bright' },
  { label: 'Account Number', value: '6117562138' },
]

const cryptoWallets = [
  { label: 'USDT ', address: '0xc3f1b82FBFAE2f9A61e2E512AF197b8c997c4F15' },
  { label: 'ETH', address: '0xc3f1b82FBFAE2f9A61e2E512AF197b8c997c4F15' },
  { label: 'Solana', address: '4M65QgbTQoTSGX4kcaapkGhpZjuM1E5zGyYeSQ6PLak2' },
]
</script>