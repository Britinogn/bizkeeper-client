<template>
  <div>

    <!-- How it works -->
    <section id="how-it-works" class="px-6 md:px-12 py-20 lg:py-28 bg-(--background)">
      <div class="text-center mb-16">
        <p class="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">How It Works</p>
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary) mb-4">
          Get started in minutes
        </h2>
        <p class="text-lg text-(--text-muted) max-w-2xl mx-auto leading-relaxed">
          Four simple steps to turn your business records into digital system with no technical skills needed
        </p>
      </div>

      <div class="relative max-w-6xl mx-auto">
        <!-- Horizontal connector line (visible on lg+) -->
        <div class="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-(--border)" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          <div
            v-for="step in steps"
            :key="step.num"
            class="group relative flex flex-col items-center text-center bg-(--surface) border border-(--border) rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
          >
            <!-- Number circle with hover effect -->
            <div class="w-16 h-16 rounded-full bg-(--surface) border-2 border-blue-200 text-blue-600 flex items-center justify-center text-2xl font-bold font-mono mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
              {{ step.num }}
            </div>

            <!-- Optional: Add icon here (recommended!) -->
            <component 
              :is="step.icon" 
              class="w-10 h-10 text-blue-500 mb-4 group-hover:text-(--text-primary) transition-colors" 
            />
            <h3 class="text-lg font-semibold text-(--text-primary) mb-3">{{ step.title }}</h3>
            <p class="text-sm text-(--text-muted) leading-relaxed">{{ step.desc }}</p>

            <!-- Arrow indicator on mobile/small screens (optional visual flow) -->
            <div class="lg:hidden mt-6 text-blue-400">
              <ArrowDown v-if="step.num !== '04'" :size="24" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="px-6 md:px-12 py-20 lg:py-28 bg-(--surface) border-t border-b border-(--border)">
      <div class="text-center mb-16">
        <p class="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Pricing</p>
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--text-primary) mb-4">
          Simple, honest pricing
        </h2>
        <p class="text-lg text-(--text-muted) max-w-xl mx-auto leading-relaxed">
          Start free forever. Upgrade only when your business grows — no surprises.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        <div
          v-for="plan in pricing"
          :key="plan.tier"
          class="relative rounded-2xl p-8 border transition-all duration-300"
          :class="[
            plan.featured 
              ? 'border-blue-600 bg-blue-600/5 shadow-xl scale-[1.04] md:scale-105 hover:scale-[1.06]' 
              : 'border-(--border) bg-(--surface) hover:border-blue-400 hover:shadow-lg'
          ]"
        >
          <!-- Featured badge -->
          <div 
            v-if="plan.featured" 
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md"
          >
            Most Popular
          </div>

          <p class="text-sm font-medium text-(--text-muted) mb-3">{{ plan.tier }}</p>
          
          <div class="flex items-baseline mb-2">
            <p class="text-5xl font-extrabold font-mono tracking-tight text-(--text-primary)">
              {{ plan.price }}
            </p>
            <span class="text-xl font-medium text-(--text-muted) ml-1">/mo</span>
          </div>

          <p class="text-sm text-(--text-muted) mb-6">{{ plan.period || 'Billed monthly • Cancel anytime' }}</p>

          <p class="text-base text-(--text-primary) leading-relaxed mb-8">{{ plan.desc }}</p>

          <ul class="space-y-3 mb-8">
            <li
              v-for="f in plan.features"
              :key="f.text"
              class="flex items-center gap-3 text-sm"
              :class="f.included ? 'text-(--text-primary)' : 'text-(--text-muted) opacity-60'"
            >
              <span
                class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                :class="f.included 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-(--border) border-(--border)'"
              >
                <Check v-if="f.included" :size="14" class="text-green-500" />
                <X v-else :size="14" class="text-(--text-muted)" />
              </span>
              {{ f.text }}
            </li>
          </ul>

          <NuxtLink
            to="/auth/register"
            class="flex items-center justify-center w-full py-3.5 rounded-xl text-base font-semibold transition-all duration-300"
            :class="plan.featured 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
              : 'border-2 border-(--border) text-(--text-primary) hover:border-blue-400 hover:bg-blue-50/50'"
          >
            {{ plan.cta || (plan.featured ? 'Start Free Trial' : 'Get Started') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Trust footer note -->
      <p class="text-center text-sm text-(--text-muted) mt-12">
        No credit card required to start. 14-day free access to all features on upgrade.
      </p>
    </section>

    <!-- CTA -->
    <section class="px-6 md:px-12 py-20 lg:py-28 bg-(--background) text-center border-b border-(--border)">
      <div class="max-w-3xl mx-auto">
        <p class="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">
          Get Started Today
        </p>

        <h2 class="text-3xl sm:text-3xl lg:text-6xl font-extrabold tracking-tight text-(--text-primary) mb-5 leading-tight">
          Ready to replace the notebook<br class="hidden sm:inline" /> and spreadsheets for good?
        </h2>

        <p class="text-lg sm:text-xl text-(--text-muted) max-w-2xl mx-auto leading-relaxed mb-10">
          Join hundreds of businesses already saving hours every week with BizKeeper.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NuxtLink
            to="/auth/register"
            class="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all hover:scale-[1.02] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create your free account in 60 seconds
          </NuxtLink>

          <a
            href="#features"
            class="w-full sm:w-auto px-8 py-4 text-base font-semibold text-(--text-primary) border border-(--border) hover:border-blue-400 hover:bg-blue-50/50 rounded-xl transition-all"
          >
            View features
          </a>
        </div>

        <!-- Trust micro-copy – very important for conversion in the markets -->
        <p class="mt-8 text-sm text-(--text-muted)">
          No card required • Cancel anytime • Free to start
        </p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { Check, X , UserPlus, PlusCircle, Package, BarChart3 } from 'lucide-vue-next'

const steps = [
  { 
    num: '01', 
    icon: UserPlus,
    title: 'Create your account', 
    desc: 'Sign up with your name and email. Your account becomes your private workspace.' 
  },
  { 
    num: '02', 
    icon: PlusCircle,
    title: 'Start a new session', 
    desc: 'Create a session and enter the supplier, date, and payment method.' 
  },
  { 
    num: '03', 
    icon: Package,
    title: 'Add your products', 
    desc: 'Enter each product with its name, quantity, price, and category. Save everything at once.' 
  },
  { 
    num: '04', 
    icon: BarChart3,
    title: 'Track and export', 
    desc: 'Your dashboard updates instantly. View summaries, track price changes, and export anytime.' 
  },
]

const pricing = [
  {
    tier: 'Starter', price: 'Free', period: 'Free forever', featured: false,
    desc: 'Perfect for individuals getting started with digital records.',
    cta: 'Start free',
    features: [
      { text: 'Up to 30 sessions/month', included: true },
      { text: 'Spending summary', included: true },
      { text: 'Price history', included: true },
      { text: 'CSV & PDF export', included: false },
      { text: 'Reorder reminders', included: false },
    ],
  },
  {
    tier: 'Pro', price: '$5.50', period: 'per month (~₦2,500)', featured: true,
    desc: 'For business owners who need the full picture — exports, alerts, and unlimited records.',
    cta: 'Start free trial',
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
    cta: 'Contact sales',
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