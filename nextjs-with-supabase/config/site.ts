// config/site.ts
import type { Metadata } from 'next'

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links?: { // Optional: If you want to keep links here for other uses
    github?: string
    // Add other links if needed
  }
  keywords?: string[]
}

export const siteConfig: SiteConfig = {
  name: "Coriyon’s Studio", // Update if your name changed
  description:
    "A CMS-driven UX design portfolio and interactive tool hub built with Next.js, Tailwind CSS, and Supabase.", // Updated description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/opengraph-image.png", // Use the default OG image in /app
  keywords: [ // Update keywords as needed
    "Next.js",
    "Supabase",
    "React",
    "Tailwind CSS",
    "Server Components",
    "UX Design",
    "Portfolio",
    "Coriyon Arrington", // Keep if relevant
  ],
  // Optional links example:
  // links: {
  //   github: "https://github.com/CoriyonArrington/nextjs-with-supabase",
  // },
}

// Define base metadata for easier reuse in root layout
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // Creates titles like "Page Name | Coriyon's Studio"
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Coriyon Arrington", url: siteConfig.url }], // Update author info
  creator: "Coriyon Arrington", // Update creator info
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage, // default OG image
        width: 1200, // Specify dimensions
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // creator: "@YourTwitterHandle", // Optional
  },
  // Add other default tags like icons if needed
  // icons: {
  //   icon: "/favicon.ico",
  // },
}