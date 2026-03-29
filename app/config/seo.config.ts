// config/seo.config.ts

export const seoConfig = {
  appName: 'BizKeeper',
  title: 'BizKeeper - Digital Purchase Records for Business Owners',
  description: 'BizKeeper helps business owners replace the notebook. Record bulk purchases, track spending by category, monitor price changes, and export reports as PDF or CSV — all in one secure place.',
  keywords: 'purchase record app for business, business expense tracker, bulk purchase tracker, stock purchase log app, small business spending tracker, digital ledger, price history, reorder reminders, CSV export, PDF report, BizKeeper',
  url: 'https://bizkeeper.pxxl.click',
  siteName: 'BizKeeper',
  locale: 'en_US',
  themeColor: '#2563EB',

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
        '@id': 'https://bizkeeper.pxxl.click/#organization',
        name: 'BizKeeper',
        url: 'https://bizkeeper.pxxl.click',
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
          areaServed: 'Worldwide'
        }
      },
      // WebApplication
      {
        '@type': 'WebApplication',
        '@id': 'https://bizkeeper.pxxl.click/#webapp',
        name: 'BizKeeper',
        url: 'https://bizkeeper.pxxl.click',
        description: 'Record bulk purchases, track spending, monitor price changes, and export digital ledger reports — built for business owners everywhere.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
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