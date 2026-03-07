<template>
  <div class="min-h-screen bg-[#0F0F0F] text-white font-sans">

    <!-- NAVBAR -->
    <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16 bg-[#0F0F0F]/85 backdrop-blur-md border-b border-[#2A2A2A]">
      <a href="#" class="flex items-center gap-2.5 no-underline">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[13px] font-bold text-white">BK</div>
        <span class="text-[16px] font-bold text-white tracking-tight">BizKeeper</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-8 list-none">
        <li><a href="#features" class="text-sm text-[#888] hover:text-white transition-colors">Features</a></li>
        <li><a href="#how-it-works" class="text-sm text-[#888] hover:text-white transition-colors">How it works</a></li>
        <li><a href="#pricing" class="text-sm text-[#888] hover:text-white transition-colors">Pricing</a></li>
      </ul>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center gap-2.5">
        <a href="/login" class="px-4 py-2 text-sm font-medium text-[#888] border border-[#2A2A2A] rounded-lg hover:text-white hover:border-[#444] transition-all">
          Sign in
        </a>
        <a href="/register" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Get started
        </a>
      </div>

      <!-- Hamburger -->
      <button class="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer" @click="menuOpen = !menuOpen">
        <span class="block w-5.5 h-0.5 bg-[#888] rounded transition-all" :class="{ 'rotate-45 translate-y-2': menuOpen }"></span>
        <span class="block w-5.5 h-0.5 bg-[#888] rounded transition-all" :class="{ 'opacity-0': menuOpen }"></span>
        <span class="block w-5.5 h-0.5 bg-[#888] rounded transition-all" :class="{ '-rotate-45 -translate-y-2': menuOpen }"></span>
      </button>
    </nav>

    <!-- MOBILE MENU -->
    <div v-if="menuOpen" class="fixed top-16 left-0 right-0 z-40 bg-[#1A1A1A] border-b border-[#2A2A2A] px-[5%] py-5 flex flex-col gap-1 md:hidden">
      <a href="#features" class="py-3 text-[15px] text-[#888] border-b border-[#2A2A2A] hover:text-white transition-colors" @click="menuOpen = false">Features</a>
      <a href="#how-it-works" class="py-3 text-[15px] text-[#888] border-b border-[#2A2A2A] hover:text-white transition-colors" @click="menuOpen = false">How it works</a>
      <a href="#pricing" class="py-3 text-[15px] text-[#888] border-b border-[#2A2A2A] hover:text-white transition-colors" @click="menuOpen = false">Pricing</a>
      <a href="/login" class="py-3 text-[15px] text-[#888] border-b border-[#2A2A2A] hover:text-white transition-colors" @click="menuOpen = false">Sign in</a>
      <a href="/register" class="mt-2 py-3 text-center text-[15px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" @click="menuOpen = false">
        Get started free
      </a>
    </div>

    <!-- HERO -->
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-28 pb-20 relative overflow-hidden">
      <!-- Glow -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 border border-blue-500/30 rounded-full text-xs font-medium text-blue-300 bg-blue-600/8 mb-7">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
        Built for business owners in Africa
      </div>

      <!-- Title -->
      <h1 class="text-[clamp(38px,6vw,68px)] font-extrabold tracking-[-2px] leading-[1.08] max-w-[820px] mb-5">
        Your business records,<br>
        <span class="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">digital &amp; secure</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-[clamp(15px,2vw,18px)] text-[#888] max-w-[500px] leading-relaxed mb-10">
        Stop writing in books. BizKeeper lets you record your bulk purchases, track spending, and monitor price changes — all in one place.
      </p>

      <!-- CTAs -->
      <div class="flex items-center gap-3 flex-wrap justify-center mb-14 w-full sm:w-auto">
        <a href="/register" class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
          Start for free
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
        <a href="#how-it-works" class="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium text-white border border-[#2A2A2A] rounded-xl hover:border-[#444] transition-colors">
          See how it works
        </a>
      </div>

      <!-- Stats -->
      <div class="flex items-center gap-8 flex-wrap justify-center">
        <div class="text-center">
          <div class="text-2xl font-bold font-mono tracking-tight">100%</div>
          <div class="text-xs text-[#888] mt-0.5">Private data</div>
        </div>
        <div class="hidden sm:block w-px h-8 bg-[#2A2A2A]"></div>
        <div class="text-center">
          <div class="text-2xl font-bold font-mono tracking-tight">PDF</div>
          <div class="text-xs text-[#888] mt-0.5">Export ready</div>
        </div>
        <div class="hidden sm:block w-px h-8 bg-[#2A2A2A]"></div>
        <div class="text-center">
          <div class="text-2xl font-bold font-mono tracking-tight">∞</div>
          <div class="text-xs text-[#888] mt-0.5">Sessions</div>
        </div>
        <div class="hidden sm:block w-px h-8 bg-[#2A2A2A]"></div>
        <div class="text-center">
          <div class="text-2xl font-bold font-mono tracking-tight">14d</div>
          <div class="text-xs text-[#888] mt-0.5">Reorder alerts</div>
        </div>
      </div>
    </section>

    <!-- DASHBOARD PREVIEW -->
    <div class="px-[5%] pb-24 bg-[#0F0F0F]">
      <div class="max-w-4xl mx-auto">
        <!-- Label -->
        <div class="flex items-center gap-3 text-[11px] font-medium text-[#888] uppercase tracking-widest mb-4">
          <div class="flex-1 h-px bg-[#2A2A2A]"></div>
          Live dashboard preview
          <div class="flex-1 h-px bg-[#2A2A2A]"></div>
        </div>
        <!-- Window -->
        <div class="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <!-- Topbar -->
          <div class="flex items-center gap-2 px-4 py-3.5 border-b border-[#2A2A2A] bg-white/[0.02]">
            <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
            <div class="flex-1 text-center text-[11px] text-[#888] font-mono">app.bizkeeper.com/dashboard</div>
          </div>
          <!-- Body -->
          <div class="flex min-h-[340px]">
            <!-- Sidebar (hidden on mobile) -->
            <div class="hidden md:block w-44 border-r border-[#2A2A2A] p-3 bg-black/20">
              <div class="flex items-center gap-2 px-2 py-1.5 mb-4">
                <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold">BK</div>
                <span class="text-[13px] font-semibold">BizKeeper</span>
              </div>
              <div v-for="item in sidebarItems" :key="item.label"
                class="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs mb-0.5 transition-colors"
                :class="item.active ? 'bg-blue-600/12 text-blue-400' : 'text-[#888]'">
                <div class="w-3.5 h-3.5 rounded bg-[#2A2A2A]" :class="{ 'bg-blue-400/30': item.active }"></div>
                {{ item.label }}
              </div>
            </div>
            <!-- Main -->
            <div class="flex-1 p-4 overflow-hidden">
              <div class="flex items-center justify-between mb-3.5">
                <span class="text-sm font-semibold">Dashboard</span>
                <span class="text-[10px] font-medium bg-blue-600 text-white px-2.5 py-1 rounded-md">+ New Session</span>
              </div>
              <!-- Cards -->
              <div class="grid grid-cols-3 gap-2 mb-3.5">
                <div v-for="card in previewCards" :key="card.label" class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-2.5">
                  <div class="text-[9px] text-[#888] font-medium mb-1 uppercase tracking-wide">{{ card.label }}</div>
                  <div class="text-[15px] font-bold font-mono" :class="card.color || 'text-white'">{{ card.value }}</div>
                  <div class="text-[9px] mt-0.5" :class="card.subColor || 'text-[#888]'">{{ card.sub }}</div>
                </div>
              </div>
              <!-- Chart -->
              <div class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-2.5 mb-2.5">
                <div class="text-[10px] text-[#888] font-medium mb-2">Monthly Spending</div>
                <div class="flex items-end gap-1.5 h-12">
                  <div v-for="bar in chartBars" :key="bar.h"
                    class="flex-1 rounded-t-sm transition-opacity hover:opacity-80"
                    :class="bar.highlight ? 'bg-blue-600' : 'bg-[#2A2A2A]'"
                    :style="{ height: bar.h + 'px' }">
                  </div>
                </div>
              </div>
              <!-- Table -->
              <div class="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg overflow-hidden">
                <div class="grid grid-cols-3 px-2.5 py-1.5 border-b border-[#2A2A2A] text-[9px] font-medium text-[#888] uppercase tracking-wider">
                  <span>Supplier</span><span>Date</span><span class="text-right">Total</span>
                </div>
                <div v-for="row in previewRows" :key="row.supplier"
                  class="grid grid-cols-3 px-2.5 py-1.5 border-b border-[#2A2A2A]/50 last:border-0 text-[10px] items-center hover:bg-white/[0.02]">
                  <span class="font-medium">{{ row.supplier }}</span>
                  <span class="text-[#888] font-mono text-[9px]">{{ row.date }}</span>
                  <span class="font-mono font-semibold text-right">{{ row.amount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURES -->
    <section id="features" class="px-[5%] py-24 bg-[#1A1A1A]">
      <div class="mb-14">
        <div class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Features</div>
        <h2 class="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight leading-tight mb-3.5">
          Everything you need to<br>run your records
        </h2>
        <p class="text-[16px] text-[#888] max-w-[500px] leading-relaxed">
          No spreadsheets. No physical books. Just clean, secure, digital records — always at your fingertips.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A] rounded-2xl overflow-hidden border border-[#2A2A2A]">
        <div v-for="feature in features" :key="feature.title"
          class="bg-[#1A1A1A] hover:bg-[#1f1f1f] p-8 transition-colors">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-xl" :style="{ background: feature.iconBg }">
            {{ feature.icon }}
          </div>
          <h3 class="text-[16px] font-semibold mb-2 text-white">{{ feature.title }}</h3>
          <p class="text-sm text-[#888] leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="px-[5%] py-24 bg-[#0F0F0F]">
      <div class="text-center mb-14">
        <div class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">How it works</div>
        <h2 class="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-3.5">Up and running in minutes</h2>
        <p class="text-[16px] text-[#888] max-w-[480px] mx-auto leading-relaxed">
          Four simple steps from sign up to your first digital ledger entry.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <!-- Connector line (desktop only) -->
        <div class="hidden lg:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-[#2A2A2A]"></div>
        <div v-for="step in steps" :key="step.num"
          class="flex flex-col items-center text-center relative z-10">
          <div class="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-lg font-bold font-mono mb-5 hover:bg-blue-600 hover:border-blue-600 transition-all cursor-default">
            {{ step.num }}
          </div>
          <h3 class="text-[15px] font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-sm text-[#888] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="px-[5%] py-24 bg-[#1A1A1A] border-t border-b border-[#2A2A2A]">
      <div class="text-center mb-14">
        <div class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Pricing</div>
        <h2 class="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-3.5">Simple, honest pricing</h2>
        <p class="text-[16px] text-[#888] max-w-[400px] mx-auto leading-relaxed">
          Start free. Upgrade when you're ready. No hidden fees.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[900px] mx-auto">
        <div v-for="plan in pricing" :key="plan.tier"
          class="relative rounded-2xl p-8 border transition-colors"
          :class="plan.featured
            ? 'border-blue-600 bg-blue-600/5'
            : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#444]'">
          <!-- Badge -->
          <div v-if="plan.featured"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </div>
          <div class="text-[13px] font-medium text-[#888] mb-2">{{ plan.tier }}</div>
          <div class="text-4xl font-extrabold font-mono tracking-tight mb-1">{{ plan.price }}</div>
          <div class="text-[13px] text-[#888] mb-5">{{ plan.period }}</div>
          <p class="text-[13px] text-[#888] leading-relaxed mb-6">{{ plan.desc }}</p>
          <ul class="space-y-2.5 mb-7">
            <li v-for="f in plan.features" :key="f.text"
              class="flex items-center gap-2.5 text-[13px]"
              :class="f.included ? 'text-white' : 'text-[#888]/40'">
              <span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0"
                :class="f.included ? 'bg-green-500/15 text-green-400' : 'bg-[#2A2A2A] text-[#888]'">
                {{ f.included ? '✓' : '✕' }}
              </span>
              {{ f.text }}
            </li>
          </ul>
          <a href="/register"
            class="flex items-center justify-center w-full py-2.5 rounded-lg text-[14px] font-medium transition-colors"
            :class="plan.featured
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-transparent text-white border border-[#2A2A2A] hover:border-[#444]'">
            {{ plan.cta }}
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-[5%] py-24 bg-[#0F0F0F] text-center border-b border-[#2A2A2A]">
      <div class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Get started today</div>
      <h2 class="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight mb-3.5">Ready to ditch the notebook?</h2>
      <p class="text-[16px] text-[#888] max-w-[440px] mx-auto leading-relaxed mb-9">
        Join business owners already using BizKeeper to keep cleaner, smarter records.
      </p>
      <div class="flex items-center gap-3 justify-center flex-wrap">
        <a href="/register" class="px-7 py-3.5 text-[15px] font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
          Create free account
        </a>
        <a href="#features" class="px-7 py-3.5 text-[15px] font-medium text-white border border-[#2A2A2A] rounded-xl hover:border-[#444] transition-colors">
          Learn more
        </a>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="px-[5%] py-12 flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[13px] font-bold text-white">BK</div>
        <span class="text-[15px] font-bold">BizKeeper</span>
      </div>
      <span class="text-[13px] text-[#888]">© 2026 BizKeeper. All rights reserved.</span>
      <div class="flex gap-6 flex-wrap">
        <a href="#" class="text-[13px] text-[#888] hover:text-white transition-colors">Privacy</a>
        <a href="#" class="text-[13px] text-[#888] hover:text-white transition-colors">Terms</a>
        <a href="#" class="text-[13px] text-[#888] hover:text-white transition-colors">Contact</a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)

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
  { h: 28 }, { h: 36 }, { h: 24 }, { h: 42 }, { h: 32 }, { h: 50, highlight: true }
]

const previewRows = [
  { supplier: 'Alaba Market', date: '05 Mar', amount: '₦2.3M' },
  { supplier: 'Lagos Wholesale', date: '05 Mar', amount: '₦270K' },
  { supplier: 'Kano Depot', date: '01 Mar', amount: '₦680K' },
]

const features = [
  {
    icon: '📦', iconBg: 'rgba(37,99,235,0.12)', title: 'Purchase Sessions',
    desc: 'Record everything you bought in one session. Add multiple products at once — just like filling a ledger page, but digital.',
  },
  {
    icon: '📊', iconBg: 'rgba(34,201,122,0.12)', title: 'Spending Summary',
    desc: 'See exactly how much you spent this week or month — broken down by category and supplier. No manual maths needed.',
  },
  {
    icon: '📈', iconBg: 'rgba(155,109,255,0.12)', title: 'Price History',
    desc: 'Automatically tracks price changes for every product. See if rice or oil went up since the last time you bought.',
  },
  {
    icon: '🔔', iconBg: 'rgba(245,166,35,0.12)', title: 'Reorder Reminders',
    desc: 'Get alerted when a product hasn\'t been restocked in 14 days. Never run out of stock without knowing it.',
  },
  {
    icon: '📥', iconBg: 'rgba(240,79,90,0.12)', title: 'Export Reports',
    desc: 'Download your records as PDF or CSV at any time. Share with your accountant, file it, or open in Excel.',
  },
  {
    icon: '🔒', iconBg: 'rgba(37,99,235,0.08)', title: '100% Private',
    desc: 'Your records belong to you only. No other user can ever see your data. Enforced at database level.',
  },
]

const steps = [
  { num: '01', title: 'Create your account', desc: 'Sign up with your name and email. Your account is your private workspace.' },
  { num: '02', title: 'Open a session', desc: 'Tap "New Session" and enter the supplier name, date, and payment method.' },
  { num: '03', title: 'Add your products', desc: 'List every product bought — name, quantity, price, category. Save once.' },
  { num: '04', title: 'Track & export', desc: 'Dashboard updates instantly. View summaries, spot price changes, and export anytime.' },
]

const pricing = [
  {
    tier: 'Starter', price: 'Free', period: 'forever', featured: false,
    desc: 'Perfect for individuals just getting started with digital records.',
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
    desc: 'For larger operations that need dedicated support and custom integrations.',
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