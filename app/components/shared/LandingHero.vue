<template>
  <div>

    <!-- Hero -->
    <section class="min-h-screen flex flex-col items-center justify-center bg-(--background) text-center px-6 md:px-12 pt-28 pb-20 relative overflow-hidden">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-75 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-blue-400 border border-blue-500/30 bg-blue-600/10 mb-7">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Built for business owners in Africa
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-(--text-primary) max-w-3xl mb-5">
        Your business records,<br />
        <span class="bg-linear-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          digital &amp; secure
        </span>
      </h1>

      <p class="text-base sm:text-lg text-(--text-muted) max-w-md leading-relaxed mb-10">
        Stop writing in books. Record bulk purchases, track spending, and monitor price changes — all in one place.
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-14">
        <NuxtLink
          to="/auth/register"
          class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-(--text-primary) bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
        >
          Start for free
          <ArrowRight :size="16" />
        </NuxtLink>

        <a href="#how-it-works" class="w-full sm:w-auto flex items-center justify-center px-7 py-3.5 text-sm font-medium text-(--text-primary) border border-(--border) hover:border-[#444] rounded-xl transition-colors">
          See how it works
        </a>
      </div>

      <div class="flex items-center gap-8 flex-wrap justify-center">
        <template v-for="(stat, i) in stats" :key="stat.label">
          <div class="text-center">
            <p class="text-2xl font-bold font-mono tracking-tight text-(--text-primary)">{{ stat.value }}</p>
            <p class="text-xs text-(--text-muted) mt-0.5">{{ stat.label }}</p>
          </div>
          <div v-if="i < stats.length - 1" class="hidden sm:block w-px h-8 bg-(--border)" />
        </template>
      </div>
    </section>

    <!-- Dashboard preview -->
    <div class="px-6 md:px-12 pb-24 bg-(--background)">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-3 text-[11px] font-medium text-(--text-muted) uppercase tracking-widest mb-4">
          <div class="flex-1 h-px bg-(--border)" />
          Live dashboard preview
          <div class="flex-1 h-px bg-(--border)" />
        </div>

        <div class="bg-(--surface) border border-(--border) rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <!-- Browser bar -->
          <div class="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-white/5">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span class="flex-1 text-center text-[11px] text-(--text-muted) font-mono">app.bizkeeper.com/dashboard</span>
          </div>

          <div class="flex min-h-80">
            <!-- Sidebar -->
            <div class="hidden md:flex flex-col w-44 border-r border-(--border) p-3 bg-black/20">
              <div class="flex items-center gap-2 px-2 py-1.5 mb-4">
                <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white">BK</div>
                <span class="text-[13px] font-semibold text-(--text-primary)">BizKeeper</span>
              </div>
              <div
                v-for="item in sidebarItems"
                :key="item.label"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-colors"
                :class="item.active ? 'bg-blue-600/15 text-blue-400' : 'text-(--text-muted)'"
              >
                <component :is="item.icon" :size="12" class="shrink-0" />
                {{ item.label }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 p-4 overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-semibold text-(--text-primary)">Dashboard</span>
                <span class="text-[10px] font-medium bg-blue-600 text-white px-2.5 py-1 rounded-md">+ New Session</span>
              </div>

              <!-- Summary cards -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <div v-for="card in previewCards" :key="card.label" class="bg-(--background) border border-(--border) rounded-lg p-2.5">
                  <p class="text-[9px] text-(--text-muted) font-medium uppercase tracking-wide mb-1">{{ card.label }}</p>
                  <p class="text-[15px] font-bold font-mono" :class="card.color ?? 'text-(--text-primary)'">{{ card.value }}</p>
                  <p class="text-[9px] mt-0.5" :class="card.subColor ?? 'text-(--text-muted)'">{{ card.sub }}</p>
                </div>
              </div>

              <!-- Bar chart -->
              <div class="bg-(--background) border border-(--border) rounded-lg p-2.5 mb-3">
                <p class="text-[10px] text-(--text-muted) font-medium mb-2">Monthly Spending</p>
                <div class="flex items-end gap-1.5 h-12">
                  <div
                    v-for="(bar, i) in chartBars"
                    :key="i"
                    class="flex-1 rounded-t-sm"
                    :class="bar.highlight ? 'bg-blue-600' : 'bg-(--border)'"
                    :style="{ height: bar.h + 'px' }"
                  />
                </div>
              </div>

              <!-- Recent sessions table -->
              <div class="bg-(--background) border border-(--border) rounded-lg overflow-hidden">
                <div class="grid grid-cols-3 px-2.5 py-1.5 border-b border-(--border) text-[9px] font-medium text-(--text-muted) uppercase tracking-wider">
                  <span>Supplier</span><span>Date</span><span class="text-right">Total</span>
                </div>
                <div
                  v-for="row in previewRows"
                  :key="row.supplier"
                  class="grid grid-cols-3 px-2.5 py-1.5 border-b border-(--border)/50 last:border-0 text-[10px] items-center"
                >
                  <span class="font-medium text-(--text-primary)">{{ row.supplier }}</span>
                  <span class="text-(--text-muted) text-[9px] font-mono">{{ row.date }}</span>
                  <span class="font-mono font-semibold text-right text-(--text-primary)">{{ row.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <section id="features" class="px-6 md:px-12 py-24 bg-(--surface)">
      <div class="mb-14">
        <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Features</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-(--text-primary)">Everything you need to run your records</h2>
        <p class="text-base text-(--text-muted) max-w-md leading-relaxed">No spreadsheets. No physical books. Clean, secure, digital records — always accessible.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--border) rounded-2xl overflow-hidden border border-(--border)">
        <div v-for="feature in features" :key="feature.title" class="bg-(--surface) hover:bg-(--text-primary) p-8 transition-colors">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-5" :style="{ background: feature.iconBg }">
            <component :is="feature.icon" :size="20" :style="{ color: feature.iconColor }" />
          </div>
          <h3 class="text-sm font-semibold mb-2 text-(--text-muted)">{{ feature.title }}</h3>
          <p class="text-sm text-(--text-muted) leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight, LayoutDashboard, BookOpen, TrendingUp,
  Bell, Download, Lock, ShoppingBag, BarChart2
} from 'lucide-vue-next'

const stats = [
  { value: '100%', label: 'Private data' },
  { value: 'PDF', label: 'Export ready' },
  { value: '∞', label: 'Sessions' },
  { value: '14d', label: 'Reorder alerts' },
]

const sidebarItems = [
  { label: 'Dashboard', active: true, icon: LayoutDashboard },
  { label: 'Ledger', active: false, icon: BookOpen },
  { label: 'Price History', active: false, icon: TrendingUp },
  { label: 'Reorder', active: false, icon: Bell },
  { label: 'Export', active: false, icon: Download },
]

const previewCards = [
  { label: 'Total Spent', value: '₦4.2M', sub: '↑ 12% this month', subColor: 'text-green-400' },
  { label: 'Sessions', value: '38', sub: 'This month' },
  { label: 'Reorder Alerts', value: '3', sub: 'Needs attention', color: 'text-red-400', subColor: 'text-red-400' },
]

const chartBars = [
  { h: 28, highlight: false }, { h: 36, highlight: false }, { h: 24, highlight: false },
  { h: 42, highlight: false }, { h: 32, highlight: false }, { h: 50, highlight: true },
]

const previewRows = [
  { supplier: 'Alaba Market', date: '05 Mar', amount: '₦2.3M' },
  { supplier: 'Lagos Wholesale', date: '03 Mar', amount: '₦270K' },
  { supplier: 'Kano Depot', date: '01 Mar', amount: '₦680K' },
]

const features = [
  {
    icon: ShoppingBag,
    iconBg: 'rgba(37,99,235,0.12)',
    iconColor: '#2563EB',
    title: 'Purchase Sessions',
    desc: 'Record everything bought in one session. Add multiple products at once — just like filling a ledger page, but digital.',
  },
  {
    icon: BarChart2,
    iconBg: 'rgba(34,201,122,0.12)',
    iconColor: '#22C97A',
    title: 'Spending Summary',
    desc: 'See how much you spent this week or month — broken down by category and supplier. No manual maths.',
  },
  {
    icon: TrendingUp,
    iconBg: 'rgba(155,109,255,0.12)',
    iconColor: '#9B6DFF',
    title: 'Price History',
    desc: 'Automatically tracks price changes for every product. See if rice or oil went up since your last purchase.',
  },
  {
    icon: Bell,
    iconBg: 'rgba(245,166,35,0.12)',
    iconColor: '#F5A623',
    title: 'Reorder Reminders',
    desc: 'Get alerted when a product hasn\'t been restocked in 14 days. Never run out of stock without knowing.',
  },
  {
    icon: Download,
    iconBg: 'rgba(240,79,90,0.12)',
    iconColor: '#F04F5A',
    title: 'Export Reports',
    desc: 'Download your records as PDF or CSV anytime. Share with your accountant or open in Excel.',
  },
  {
    icon: Lock,
    iconBg: 'rgba(37,99,235,0.08)',
    iconColor: '#2563EB',
    title: '100% Private',
    desc: 'Your records belong to you only. No other user can ever see your data. Enforced at database level.',
  },
]
</script>