// File: config/site.ts

export interface SiteConfig {
    name: string
    description: string
    url: string
    ogImage: string
    keywords: string[]
  }
  
  export const siteConfig: SiteConfig = {
    name: "Coriyon’s Studio",
    description: "A UX design studio helping people feel better through thoughtful digital experiences.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ogImage: "/og-image.jpg",
    keywords: [
      "UX Design",
      "Health Tech",
      "Portfolio",
      "Coriyon Arrington",
      "Accessibility",
      "Interactive Tools",
    ],
  }
  