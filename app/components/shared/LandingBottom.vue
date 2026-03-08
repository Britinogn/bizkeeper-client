<template>
  <div>

    <!-- How it works -->
    <section id="how-it-works" class="px-6 md:px-12 py-24 bg-(--background)">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold text-(--primary) uppercase tracking-widest mb-3">How it works</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">Up and running in minutes</h2>
        <p class="text-base text-(--text-muted) max-w-sm mx-auto leading-relaxed">Four simple steps to your first digital ledger entry.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <div class="hidden lg:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-[#2A2A2A]" />
        <div v-for="step in steps" :key="step.num" class="flex flex-col items-center text-center relative z-10">
          <div class="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-base font-bold font-mono text-white mb-5 hover:bg-blue-600 hover:border-blue-600 transition-all">
            {{ step.num }}
          </div>
          <h3 class="text-sm font-semibold mb-2 text-white">{{ step.title }}</h3>
          <p class="text-sm text-[#888] leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="px-6 md:px-12 py-24 bg-[#1A1A1A] border-t border-b border-[#2A2A2A]">
      <div class="text-center mb-14">
        <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Pricing</p>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">Simple, honest pricing</h2>
        <p class="text-base text-[#888] max-w-xs mx-auto leading-relaxed">Start free. Upgrade when you're ready.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <div
          v-for="plan in pricing"
          :key="plan.tier"
          class="relative rounded-2xl p-8 border transition-colors"
          :class="plan.featured ? 'border-blue-600 bg-blue-600/5' : 'border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#444]'"
        >
          <div v-if="plan.featured" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            Most Popular
          </div>
          <p class="text-xs font-medium text-[#888] mb-2">{{ plan.tier }}</p>
          <p class="text-4xl font-extrabold font-mono tracking-tight text-white mb-1">{{ plan.price }}</p>
          <p class="text-xs text-[#888] mb-5">{{ plan.period }}</p>
          <p class="text-sm text-[#888] leading-relaxed mb-6">{{ plan.desc }}</p>
          <ul class="space-y-2.5 mb-7">
            <li
              v-for="f in plan.features"
              :key="f.text"
              class="flex items-center gap-2.5 text-sm"
              :class="f.included ? 'text-white' : 'text-[#888]/40'"
            >
              <span
                class="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                :class="f.included ? 'bg-green-500/15' : 'bg-[#2A2A2A]'"
              >
                <Check v-if="f.included" :size="10" class="text-green-400" />
                <X v-else :size="10" class="text-[#888]" />
              </span>
              {{ f.text }}
            </li>
          </ul>
          <NuxtLink
            to="/auth/register"
            class="flex items-center justify-center w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="plan.featured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-[#2A2A2A] text-white hover:border-[#444]'"
          >
            {{ plan.cta }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 md:px-12 py-24 bg-[#0F0F0F] text-center border-b border-[#2A2A2A]">
      <p class="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Get started today</p>
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">Ready to ditch the notebook?</h2>
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

  </div>
</template>

<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'

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