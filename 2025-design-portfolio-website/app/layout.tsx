import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

// Add console logging to debug image loading issues

// Add this near the top of the file, after imports:

// Debug image loading
if (typeof window !== "undefined") {
  console.log("Environment:", {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    baseUrl: window.location.origin,
  })
}
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap", // Ensure this is set to swap
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "sans-serif"], // Add fallback fonts
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // Ensure this is set to swap
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Georgia", "serif"], // Add fallback fonts
})

// Determine the base URL based on environment
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "production"
    ? "https://www.coriyon.com/"
    : "http://localhost:3000"

export const metadata: Metadata = {
  title: "Healthcare Design Portfolio",
  description: "Helping healthcare companies create human-centered products",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current pathname for navigation
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/placeholder.svg?height=600&width=800" as="image" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

