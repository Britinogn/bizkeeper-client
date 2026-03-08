// config/seo.config.ts

export const seoConfig = {
  appName: 'BizKeeper',
  title: 'BizKeeper - Digital Purchase Records for African Business Owners',
  description: 'BizKeeper helps business owners in Africa ditch the notebook. Record bulk purchases, track spending by category, monitor price changes, and export reports as PDF or CSV — all in one secure place.',
  keywords: 'business records app, purchase tracker Nigeria, digital ledger Africa, bulk purchase recording, spending tracker, price history, reorder reminders, business expense tracker, CSV export, PDF report, BizKeeper',
  url: 'https://bizkeeper.com', // ← change to your real domain
  siteName: 'BizKeeper',
  locale: 'en_US',
  themeColor: '#2563EB', // blue-600

  // Social images (replace with your actual assets)
  ogImage: '/og-image.jpg', // 1200x630 recommended
  twitterImage: '/twitter-image.jpg', // 1200x675 recommended

  // JSON-LD Schema (Organization + WebApplication)
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization
      {
        '@type': 'Organization',
        '@id': 'https://bizkeeper.com/#organization',
        name: 'BizKeeper',
        url: 'https://bizkeeper.com',
        logo: '/logo.png',
        sameAs: [
          'https://twitter.com/britinogn',
          'https://github.com/britinogn',
          'https://linkedin.com/in/britinogn'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+234-000-000-0000',
          contactType: 'customer service',
          email: 'support@bizkeeper.com',
          areaServed: 'NG'
        }
      },
      // WebApplication
      {
        '@type': 'WebApplication',
        '@id': 'https://bizkeeper.com/#webapp',
        name: 'BizKeeper',
        url: 'https://bizkeeper.com',
        description: 'Record bulk purchases, track spending, monitor price changes, and export digital ledger reports — built for business owners in Africa.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'NGN'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '500',
          bestRating: '5',
          worstRating: '1'
        }
      }
    ]
  }
}