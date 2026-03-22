<template>
  <div>

    <!-- Hero -->
    <section class="min-h-screen flex items-center bg-(--background) px-6 md:px-12 pt-28 pb-20 relative overflow-hidden">
      <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- LEFT CONTENT -->
        <div class="text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 mb-8">
            <span class="w-2 h-2 rounded-full bg-blue-500" />
            Built for African shop owners
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-(--text-primary) leading-tight mb-6">
            Business records
            <span class="block text-blue-600">clean, digital & secure</span>
          </h1>

          <!-- Description / Promise -->
          <p class="text-lg sm:text-xl text-(--text-muted) max-w-xl leading-relaxed mb-10">
            Track purchases, suppliers, stock and sales in seconds.<br class="hidden sm:block" />
            No more notebooks. No spreadsheets. Just clarity.
          </p>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <NuxtLink
              to="/auth/register"
              class="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Your Free Ledger
              <ArrowRight :size="18" class="transition-transform group-hover:translate-x-1" />
            </NuxtLink>

            <a
              href="#how-it-works"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-4 text-base font-semibold text-(--text-primary) border border-(--border) hover:border-blue-400 hover:bg-blue-50/50 rounded-xl transition-all active:scale-[0.98]"
            >
              How It Works
            </a>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-8 md:gap-12 flex-wrap justify-center lg:justify-start">
            <template v-for="(stat, i) in stats" :key="stat.label">
              <div class="text-center lg:text-left">
                <p class="text-3xl md:text-4xl font-bold font-mono tracking-tight text-(--text-primary)">
                  {{ stat.value }}
                </p>
                <p class="text-sm text-(--text-muted) mt-1.5">
                  {{ stat.label }}
                </p>
              </div>
              <div
                v-if="i < stats.length - 1"
                class="hidden sm:block w-px h-10 bg-(--border)"
              />
            </template>
          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div class="relative flex justify-center lg:justify-end order-1 lg:order-2 mt-10 lg:mt-0">
          <div class="relative w-full max-w-xl lg:max-w-2xl group">
            <!-- Optional subtle glow — uncomment if you like it -->
            <!-- <div class="absolute inset-0 bg-blue-500/5 rounded-3xl blur-2xl -z-10 transition-opacity group-hover:opacity-75" /> -->

            <NuxtImg
              src="/img/bizkeeper-hero.png"
              alt="BizKeeper dashboard — clean view of inventory, sales and purchases for African shops"
              class="relative rounded-3xl border border-(--border) shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-blue-900/10 object-cover w-full h-auto"
              width="1000"
              height="680"
              format="webp"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard preview -->
    <div class="px-6 md:px-12 pb-24 bg-(--background)">
      <div class="max-w-4xl mx-auto">
        <!-- Section label -->
        <div class="flex items-center gap-3 text-[11px] font-medium text-(--text-muted) uppercase tracking-widest mb-4">
          <div class="flex-1 h-px bg-(--border)" />
          Live dashboard preview
          <div class="flex-1 h-px bg-(--border)" />
        </div>

        <!-- Browser window -->
        <div class="group bg-(--surface) border border-(--border) rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
          
          <!-- Browser bar -->
          <div class="flex items-center gap-2 px-4 py-3 border-b border-(--border) bg-(--surface)">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span class="flex-1 text-center text-[11px] text-(--text-muted) font-mono">app.bizkeeper.com/dashboard</span>
          </div>

          <div class="flex min-h-[420px]">
            
            <!-- Sidebar -->
            <div class="hidden md:flex flex-col w-44 border-r border-(--border) p-3 bg-(--surface)">
              <div class="flex items-center gap-2 px-2 py-1.5 mb-4">
                <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white">BK</div>
                <span class="text-[13px] font-semibold text-(--text-primary)">BizKeeper</span>
              </div>
              
              <div
                v-for="item in sidebarItems"
                :key="item.label"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-all"
                :class="item.active 
                  ? 'bg-blue-600/10 text-blue-400' 
                  : 'text-(--text-muted) hover:bg-blue-600/5 hover:text-(--text-primary)'"
              >
                <component :is="item.icon" :size="12" class="shrink-0" />
                {{ item.label }}
              </div>
            </div>

            <!-- Main content -->
            <div class="flex-1 p-5 overflow-hidden">
              
              <!-- Header -->
              <div class="flex items-center justify-between mb-5">
                <span class="text-sm font-semibold text-(--text-primary)">Dashboard</span>
                <span 
                  class="inline-flex items-center gap-1 text-[10px] font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-all active:scale-95 cursor-pointer"
                >
                  + New Session
                </span>
              </div>

              <!-- Summary cards -->
              <div class="grid grid-cols-3 gap-3 mb-5">
                <div 
                  v-for="card in previewCards" 
                  :key="card.label" 
                  class="group/card bg-(--background) border border-(--border) rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-px hover:shadow-md"
                >
                  <p class="text-[9px] text-(--text-muted) font-medium uppercase tracking-wide mb-1">{{ card.label }}</p>
                  <p class="text-[15px] font-bold font-mono" :class="card.color ?? 'text-(--text-primary)'">{{ card.value }}</p>
                  <p class="text-[9px] mt-1" :class="card.subColor ?? 'text-(--text-muted)'">{{ card.sub }}</p>
                </div>
              </div>

              <!-- Bar chart -->
              <div class="bg-(--background) border border-(--border) rounded-xl p-4 mb-5">
                <p class="text-[10px] text-(--text-muted) font-medium mb-3">Monthly Spending</p>
                <div class="flex items-end gap-2 h-12">
                  <div
                    v-for="(bar, i) in chartBars"
                    :key="i"
                    class="flex-1 rounded-t transition-all duration-200 hover:bg-blue-500"
                    :class="bar.highlight ? 'bg-blue-600' : 'bg-(--border)'"
                    :style="{ height: bar.h + 'px' }"
                  />
                </div>
              </div>

              <!-- Recent sessions table -->
              <div class="bg-(--background) border border-(--border) rounded-xl overflow-hidden">
                <div class="grid grid-cols-3 px-4 py-2.5 border-b border-(--border) text-[9px] font-medium text-(--text-muted) uppercase tracking-wider">
                  <span>Supplier</span>
                  <span>Date</span>
                  <span class="text-right">Total</span>
                </div>
                
                <div
                  v-for="row in previewRows"
                  :key="row.supplier"
                  class="grid grid-cols-3 px-4 py-2.5 border-b border-(--border)/50 last:border-0 text-[10px] items-center transition-colors hover:bg-blue-600/5"
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
    <section id="features" class="px-6 md:px-12 py-20 lg:py-28 bg-(--surface)">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <p class="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
          Features
        </p>
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary) mb-5">
          Everything you need to run your shop smarter
        </h2>
        <p class="text-lg text-(--text-muted) leading-relaxed">
          Replace messy notebooks and spreadsheets with clean, secure digital records that are always accessible, built for African retailers and wholesalers
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group relative bg-(--surface) border border-(--border) rounded-2xl p-8 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1"
        >
          <!-- Icon container -->
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            :style="{ backgroundColor: feature.iconBg || 'rgba(59, 130, 246, 0.1)' }"
          >
            <component
              :is="feature.icon"
              :size="28"
              :class="feature.iconClass || 'text-orange-600'"
            />
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-(--text-primary) mb-3 group-hover:text-blue-600 transition-colors">
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm text-(--text-muted) leading-relaxed">
            {{ feature.desc }}
          </p>

          <!-- Optional subtle bottom accent line on hover -->
          <div class="absolute bottom-0 left-8 right-8 h-0.5 bg-blue-500/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
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

const features = ref([
  {
    icon: ShoppingBag,
    iconBg: 'rgba(37,99,235,0.12)',
    iconColor: '#2563EB',
    iconClass: "text-blue-600",
    title: 'Quick Purchase and Sales Logging',
    desc: 'Record everything you buy in one session. Add multiple products at once, just like writing in a ledger, but digital.',
  },
  {
    icon: BarChart2,
    iconBg: 'rgba(34,201,122,0.12)',
    iconColor: '#22C97A',
    iconClass: "text-green-600",
    title: 'Spending Overview',
    desc: 'See how much you spend each week or month, clearly organized by category and supplier. No manual calculations needed.',
  },
  {
    icon: TrendingUp,
    iconBg: 'rgba(155,109,255,0.12)',
    iconColor: '#9B6DFF',
    iconClass: "text-orange-600",
    title: 'Price Tracking',
    desc: 'Track price changes for every product automatically. Easily see if items like rice or oil have increased since your last purchase.',
  },
  {
    icon: Bell,
    iconBg: 'rgba(245,166,35,0.12)',
    iconColor: '#F5A623',
    title: 'Reorder Alerts',
    desc: 'Get notified when a product has not been restocked for some time. Stay on top of your inventory and avoid running out.',
  },
  {
    icon: Download,
    iconBg: 'rgba(240,79,90,0.12)',
    iconColor: '#F04F5A',
    title: 'Download Reports',
    desc: 'Export your records as PDF or CSV anytime. Share them with your accountant or open them in Excel.',
  },
  {
    icon: Lock,
    iconBg: 'rgba(37,99,235,0.08)',
    iconColor: '#2563EB',
    title: 'Fully Private',
    desc: 'Your records are yours alone. No one else can access your data, with protection enforced at the database level.',
  },
])
</script>