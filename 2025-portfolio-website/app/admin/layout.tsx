import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Designer Portfolio",
  description: "Admin dashboard for the designer portfolio website",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen">{children}</div>
}
