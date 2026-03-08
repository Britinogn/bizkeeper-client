<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white" style="font-family: 'Inter', sans-serif;">

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2A2A2A]">
      <span class="text-base font-bold tracking-tight">
        Biz<span class="text-blue-500">Keeper</span>
      </span>

      <ul class="hidden md:flex items-center gap-8 text-sm text-[#888]">
        <li v-for="link in navLinks" :key="link.label">
          <a :href="link.href" class="hover:text-white transition-colors">{{ link.label }}</a>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-3">
        <NuxtLink to="/auth/login" class="text-sm text-[#888] hover:text-white px-4 py-2 transition-colors">
          Sign in
        </NuxtLink>
        <NuxtLink to="/auth/register" class="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          Get started
        </NuxtLink>
      </div>

      <button class="md:hidden flex flex-col gap-1.5 p-1" @click="menuOpen = !menuOpen">
        <span class="block w-5 h-0.5 bg-[#888] rounded transition-all" :class="{ 'rotate-45 translate-y-2': menuOpen }" />
        <span class="block w-5 h-0.5 bg-[#888] rounded transition-all" :class="{ 'opacity-0': menuOpen }" />
        <span class="block w-5 h-0.5 bg-[#888] rounded transition-all" :class="{ '-rotate-45 -translate-y-2': menuOpen }" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="fixed top-16 left-0 right-0 z-40 bg-[#1A1A1A] border-b border-[#2A2A2A] px-6 py-4 flex flex-col gap-1 md:hidden">
      <a v-for="link in navLinks" :key="link.label" :href="link.href"
        class="py-3 text-sm text-[#888] hover:text-white border-b border-[#2A2A2A] transition-colors"
        @click="menuOpen = false">
        {{ link.label }}
      </a>
      <NuxtLink to="/auth/login" class="py-3 text-sm text-[#888] hover:text-white border-b border-[#2A2A2A] transition-colors" @click="menuOpen = false">
        Sign in
      </NuxtLink>
      <NuxtLink to="/auth/register" class="mt-2 py-3 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" @click="menuOpen = false">
        Get started free
      </NuxtLink>
    </div>

    <!-- Hero -->
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 pt-28 pb-20 relative overflow-hidden">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-blue-300 border border-blue-500/30 bg-blue-600/8 mb-7">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        Built for business owners in Africa
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mb-5">
        Your business records,<br />
        <span class="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          digital &amp; secure
        </span>
      </h1>

      <p class="text-base sm:text-lg text-[#888] max-w-md leading-relaxed mb-10">
        Stop writing in books. Record bulk purchases, track spending, and monitor price changes — all in one place.
      </p>

      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-14">
        <NuxtLink to="/auth/register" class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
          Start for free
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </NuxtLink>
        <a href="#how-it-works" class="w-full sm:w-auto flex items-center justify-center px-7 py-3.5 text-sm font-medium text-white border border-[#2A2A2A] hover:border-[#444] rounded-xl transition-colors">
          See how it works
        </a>
      </div>

      <div class="flex items-center gap-8 flex-wrap justify-center">
        <template v-for="(stat, i) in stats" :key="stat.label">
          <div class="text-center">
            <p class="text-2xl font-bold font-mono tracking-tight">{{ stat.value }}</p>
            <p class="text-xs text-[#888] mt-0.5">{{ stat.label }}</p>
          </div>
          <div v-if="i < stats.length - 1" class="hidden sm:block w-px h-8 bg-[#2A2A2A]" />
        </template>
      </div>
    </section>

    <!-- Dashboard preview -->
    <div class="px-6 md:px-12 pb-24 bg-[#0F0F0F]">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center gap-3 text-[11px] font-medium text-[#888] uppercase tracking-widest mb-4">
          <div class="flex-1 h-px bg-[#2A2A2A]" />
          Live dashboard preview
          <div class="flex-1 h-px bg-[#2A2A2A]" />
        </div>

        <div class="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <div class="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-white/[0.02]">
            <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span class="flex-1 text-center text-[11px] text-[#888] font-mono">app.bizkeeper.com/dashboard</span>
          </div>

          <div class="flex min-h-[320px]">
            <div class="hidden md:flex flex-col w-44 border-r border-[#2A2A2A] p-3 bg-black/20">
              <div class="flex items-center gap-2 px-2 py-1.5 mb-4">
                <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold">BK</div>
                <span class="text-[13px] font-semibold">BizKeeper</span>
              </div>
              <div v-for="item in sidebarItems" :key="item.label"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-colors"
                :class="item.active ? 'bg-blue-600/12 text-blue-400' : 'text-[#888]'">
                <div class="w-3 h-3 rounded bg-[#2A2A2A]" :class="{ 'bg-blue-400/30': item.active }" />
                {{ item.label }}
              </div>
            </div>

            <div class="flex-1 p-4 overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-semibold">Dashboard</span>
                <span class="text-[10px] font-medium bg-blue-600 text-white px-2.5 py-1 rounded-md">+ New Session</span>
              </div>

              <div class="grid grid-cols-3 gap-2 mb-3">
                <div v-for="card in previewCards" :key="card.label" class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-2.5">
                  <p class="text-[9px] text-[#888] font-medium uppercase tracking-wide mb-1">{{ card.label }}</p>
                  <p class="text-[15px] font-bold font-mono" :class="card.color ?? 'text-white'">{{ card.value }}</p>
                  <p class="text-[9px] mt-0.5" :class="card.subColor ?? 'text-[#888]'">{{ card.sub }}</p>
                </div>
              </div>

              <div class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-2.5 mb-3">
                <p class="text-[10px] text-[#888] font-medium mb-2">Monthly Spending</p>
                <div class="flex items-end gap-1.5 h-12">
                  <div v-for="(bar, i) in chartBars" :key="i"
                    class="flex-1 rounded-t-sm"
                    :class="bar.highlight ? 'bg-blue-600' : 'bg-[#2A2A2A]'"
                    :style="{ height: bar.h + 'px' }" />
                </div>
              </div>

              <div class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg overflow-hidden">
                <div class="grid grid-cols-3 px-2.5 py-1.5 border-b border-[#2A2A2A] text-[9px] font-medium text-[#888] uppercase tracking-wider">
                  <span>Supplier</span><span>Date</span><span class="text-right">Total</span>
                </div>
                <div v-for="row in previewRows" :key="row.supplier"
                  class="grid grid-cols-3 px-2.5 py-1.5 border-b border-[#2A2A2A]/50 last:border-0 text-[10px] items-center hover:bg-white/[0.02]">
                  <span class="font-medium">{{ row.supplier }}</span>
                  <span class="text-[#888] text-[9px] font-mono">{{ row.date }}</span>
                  <span class="font-mono font-semibold text-right">{{ row.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <section id="features" class="px-6 md:px-12 py-24 bg-[#1A1A1A]">
      <div class="mb-14">
        <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Features</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Everything you need to run your records</h2>
        <p class="text-base text-[#888] max-w-md leading-relaxed">No spreadsheets. No physical books. Clean, secure, digital records — always accessible.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A] rounded-2xl overflow-hidden border border-[#2A2A2A]">
        <div v-for="feature in features" :key="feature.title" class="bg-[#1A1A1A] hover:bg-[#1f1f1f] p-8 transition-colors">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5" :style="{ background: feature.iconBg }">
            {{ feature.icon }}
          </div>
          <h3 class="text-sm font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-[#888] leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="px-6 md:px-12 py-24 bg-[#0F0F0F]">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">How it works</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Up and running in minutes</h2>
        <p class="text-base text-[#888] max-w-sm mx-auto leading-relaxed">Four simple steps to your first digital ledger entry.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <div class="hidden lg:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-[#2A2A2A]" />
        <div v-for="step in steps" :key="step.num" class="flex flex-col items-center text-center relative z-10">
          <div class="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-base font-bold font-mono mb-5 hover:bg-blue-600 hover:border-blue-600 transition-all">
            {{ step.num }}
          </div>
          <h3 class="text-sm font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-sm text-[#888] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="px-6 md:px-12 py-24 bg-[#1A1A1A] border-t border-b border-[#2A2A2A]">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Pricing</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Simple, honest pricing</h2>
        <p class="text-base text-[#888] max-w-xs mx-auto leading-relaxed">Start free. Upgrade when you're ready.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <div v-for="plan in pricing" :key="plan.tier"
          class="relative rounded-2xl p-8 border transition-colors"
          :class="plan.featured ? 'border-blue-600 bg-blue-600/5' : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#444]'">
          <div v-if="plan.featured" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
          <p class="text-xs font-medium text-[#888] mb-2">{{ plan.tier }}</p>
          <p class="text-4xl font-extrabold font-mono tracking-tight mb-1">{{ plan.price }}</p>
          <p class="text-xs text-[#888] mb-5">{{ plan.period }}</p>
          <p class="text-sm text-[#888] leading-relaxed mb-6">{{ plan.desc }}</p>
          <ul class="space-y-2.5 mb-7">
            <li v-for="f in plan.features" :key="f.text"
              class="flex items-center gap-2.5 text-sm"
              :class="f.included ? 'text-white' : 'text-[#888]/40'">
              <span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0"
                :class="f.included ? 'bg-green-500/15 text-green-400' : 'bg-[#2A2A2A] text-[#888]'">
                {{ f.included ? '✓' : '✕' }}
              </span>
              {{ f.text }}
            </li>
          </ul>
          <NuxtLink to="/auth/register"
            class="flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-[#2A2A2A] text-white hover:border-[#444]'">
            {{ plan.cta }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 md:px-12 py-24 bg-[#0F0F0F] text-center border-b border-[#2A2A2A]">
      <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Get started today</p>
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to ditch the notebook?</h2>
      <p class="text-base text-[#888] max-w-sm mx-auto leading-relaxed mb-9">
        Join business owners already using BizKeeper for cleaner, smarter records.
      </p>
      <div class="flex items-center justify-center gap-3 flex-wrap">
        <NuxtLink to="/auth/register" class="px-7 py-3.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
          Create free account
        </NuxtLink>
        <a href="#features" class="px-7 py-3.5 text-sm font-medium text-white border border-[#2A2A2A] hover:border-[#444] rounded-xl transition-colors">
          Learn more
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 md:px-12 py-10 flex items-center justify-between flex-wrap gap-4 border-t border-[#2A2A2A]">
      <span class="text-sm font-bold">Biz<span class="text-blue-500">Keeper</span></span>
      <span class="text-xs text-[#888]">© 2026 BizKeeper. All rights reserved.</span>
      <div class="flex gap-6">
        <a href="#" class="text-xs text-[#888] hover:text-white transition-colors">Privacy</a>
        <a href="#" class="text-xs text-[#888] hover:text-white transition-colors">Terms</a>
        <a href="#" class="text-xs text-[#888] hover:text-white transition-colors">Contact</a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest', layout: false })

useSeoMeta({
  title: 'BizKeeper — Digital Ledger for Business Owners',
  description: 'Track bulk purchases, monitor price changes and get reorder reminders. Built for Nigerian business owners.',
})

const menuOpen = ref(false)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

const stats = [
  { value: '100%', label: 'Private data' },
  { value: 'PDF', label: 'Export ready' },
  { value: '∞', label: 'Sessions' },
  { value: '14d', label: 'Reorder alerts' },
]

const sidebarItems = [
  { label: 'Dashboard', active: true },
  { label: 'Sessions', active: false },
  { label: 'Price History', active: false },
  { label: 'Reorder', active: false },
  { label: 'Export', active: false },
  { label: 'Settings', active: false },
]

const previewCards = [
  { label: 'Total Spent', value: '₦4.2M', sub: '↑ 12% this month', subColor: 'text-green-400' },
  { label: 'Sessions', value: '38', sub: 'This month', subColor: 'text-[#888]' },
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
  { icon: '📦', iconBg: 'rgba(37,99,235,0.12)', title: 'Purchase Sessions', desc: 'Record everything bought in one session. Add multiple products at once — just like filling a ledger page, but digital.' },
  { icon: '📊', iconBg: 'rgba(34,201,122,0.12)', title: 'Spending Summary', desc: 'See how much you spent this week or month — broken down by category and supplier. No manual maths.' },
  { icon: '📈', iconBg: 'rgba(155,109,255,0.12)', title: 'Price History', desc: 'Automatically tracks price changes for every product. See if rice or oil went up since your last purchase.' },
  { icon: '🔔', iconBg: 'rgba(245,166,35,0.12)', title: 'Reorder Reminders', desc: 'Get alerted when a product hasn\'t been restocked in 14 days. Never run out of stock without knowing.' },
  { icon: '📥', iconBg: 'rgba(240,79,90,0.12)', title: 'Export Reports', desc: 'Download your records as PDF or CSV anytime. Share with your accountant or open in Excel.' },
  { icon: '🔒', iconBg: 'rgba(37,99,235,0.08)', title: '100% Private', desc: 'Your records belong to you only. No other user can ever see your data. Enforced at database level.' },
]

const steps = [
  { num: '01', title: 'Create your account', desc: 'Sign up with your name and email. Your account is your private workspace.' },
  { num: '02', title: 'Open a session', desc: 'Tap "New Session" and enter the supplier, date, and payment method.' },
  { num: '03', title: 'Add your products', desc: 'List every product bought — name, quantity, price, category. Save once.' },
  { num: '04', title: 'Track & export', desc: 'Dashboard updates instantly. View summaries, spot price changes, export anytime.' },
]

const pricing = [
  {
    tier: 'Starter', price: 'Free', period: 'forever', featured: false,
    desc: 'Perfect for individuals getting started with digital records.',
    cta: 'Get started free',
    features: [
      { text: 'Up to 30 sessions/month', included: true },
      { text: 'Spending summary', included: true },
      { text: 'Price history', included: true },
      { text: 'CSV & PDF export', included: false },
      { text: 'Reorder reminders', included: false },
    ],
  },
  {
    tier: 'Pro', price: '₦2,500', period: 'per month', featured: true,
    desc: 'For business owners who need the full picture — exports, alerts, and unlimited records.',
    cta: 'Get started',
    features: [
      { text: 'Unlimited sessions', included: true },
      { text: 'Spending summary', included: true },
      { text: 'Price history', included: true },
      { text: 'CSV & PDF export', included: true },
      { text: 'Reorder reminders', included: true },
    ],
  },
  {
    tier: 'Enterprise', price: 'Custom', period: 'contact us', featured: false,
    desc: 'For larger operations needing dedicated support and custom integrations.',
    cta: 'Contact us',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Admin dashboard', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom onboarding', included: true },
      { text: 'SLA guarantee', included: true },
    ],
  },
]
</script>