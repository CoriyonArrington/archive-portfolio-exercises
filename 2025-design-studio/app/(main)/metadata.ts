// File: app/(main)/metadata.ts

import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

// The default metadata for every page in the “Main” wing.
// You can override these values per‑page by creating a metadata.ts
// alongside any page.tsx that needs custom SEO fields.
export const metadata: Metadata = {
  // Default <title> and title template for pages
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  // Default meta description
  description: siteConfig.description,
  // Application name (optional)
  applicationName: siteConfig.name,
  // Keywords for SEO
  keywords: siteConfig.keywords,
  // Open Graph (social share) defaults
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Twitter card defaults
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    // You can add your Twitter handle here if desired
    // creator: '@YourTwitterHandle',
  },
  // Favicon and app icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // Default language attribute
  metadataBase: new URL(siteConfig.url),
}

export default metadata
