// config/seo.config.ts

export const seoConfig = {
  appName: 'CourviaShip',
  title: 'CourviaShip - Track & Manage Shipments Worldwide',
  description: 'Real-time shipment tracking, fast logistics solutions, secure delivery updates, and easy management for businesses and individuals. Enter your tracking number to stay updated.',
  keywords: 'shipment tracking, track package, logistics, courier tracking, delivery status, real-time tracking, shipping updates, global logistics, package tracker, CourviaShip',
  url: 'https://courviaship.com', // ← change to your real domain
  siteName: 'CourviaShip',
  locale: 'en_US',
  themeColor: '#10B981', // green-600
  
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
        '@id': 'https://courviaship.com/#organization',
        name: 'CourviaShip',
        url: 'https://courviaship.com',
        logo: '/logo.png',
        sameAs: [
          'https://twitter.com/backendchildcod', // update with real socials
          'https://instagram.com/courviaship',
          'https://linkedin.com/company/courviaship'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+234-000-000-0000',
          contactType: 'customer service',
          email: 'support@courviaship.com',
          areaServed: 'NG'
        }
      },
      // WebApplication
      {
        '@type': 'WebApplication',
        '@id': 'https://courviaship.com/#webapp',
        name: 'CourviaShip',
        url: 'https://courviaship.com',
        description: 'Track shipments in real-time, manage logistics, and get delivery updates instantly.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '3200',
          bestRating: '5',
          worstRating: '1'
        }
      }
    ]
  }
}