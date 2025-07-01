/**
 * Refactoring Examples
 *
 * This provides concrete examples of how to refactor specific components
 */

export const testimonialSystemRefactoring = `
// BEFORE: Multiple overlapping testimonial components

// components/testimonials.tsx
export function Testimonials() { ... }

// components/testimonials-section.tsx
export function TestimonialsSection() { ... }

// components/home/testimonials.tsx
export function HomeTestimonials() { ... }

// AFTER: Unified testimonial component system

// components/sections/testimonials/testimonial-card.tsx
export function TestimonialCard({ testimonial, variant = "default" }) { ... }

// components/sections/testimonials/testimonial-grid.tsx
export function TestimonialGrid({ testimonials, columns = 3 }) { ... }

// components/sections/testimonials/testimonial-section.tsx
export function TestimonialSection({ 
  title, 
  description, 
  testimonials,
  variant = "default"
}) { ... }

// components/sections/home/featured-testimonials.tsx
import { TestimonialSection } from "@/components/sections/testimonials/testimonial-section"

export function FeaturedTestimonials() {
  return (
    <TestimonialSection
      title="What Our Clients Say"
      description="Hear from the people we've worked with"
      testimonials={featuredTestimonials}
      variant="featured"
    />
  )
}
`

export const layoutComponentsRefactoring = `
// BEFORE: Multiple header and footer implementations

// components/footer.tsx
export function Footer() { ... }

// components/site-footer.tsx
export function SiteFooter() { ... }

// AFTER: Unified layout components

// components/layout/footer/footer.tsx
export function Footer({ variant = "default" }) { ... }

// components/layout/header/header.tsx
export function Header({ variant = "default" }) { ... }

// components/layout/navigation/main-nav.tsx
export function MainNav({ items }) { ... }

// components/layout/navigation/mobile-nav.tsx
export function MobileNav({ items }) { ... }

// app/layout.tsx
import { Header } from "@/components/layout"
import { Footer } from "@/components/layout"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
`

export const dataFetchingRefactoring = `
// BEFORE: Inconsistent data fetching

// components/home/featured-projects.tsx
"use client"
import { useEffect, useState } from "react"

export function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetch('/api/projects?featured=true')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])
  
  return (...)
}

// AFTER: Consistent data fetching pattern

// lib/data/projects.ts
import { supabase } from "@/lib/supabase/client"

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order')
  
  if (error) throw new Error(error.message)
  return data
}

// components/sections/home/featured-projects.tsx
import { getFeaturedProjects } from "@/lib/data/projects"
import { ProjectGrid } from "@/components/sections/work/project-grid"

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()
  
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
      <ProjectGrid projects={projects} variant="featured" />
    </section>
  )
}
`

export const adminToolsRefactoring = `
// BEFORE: Fragmented admin tools

// app/admin/component-audit/page.tsx
export default function ComponentAuditPage() { ... }

// app/admin/design-system/audit/page.tsx
export default function DesignSystemAuditPage() { ... }

// AFTER: Unified admin tools

// components/admin/shared/admin-layout.tsx
export function AdminLayout({ children, sidebar }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-100 p-4">
        {sidebar}
      </div>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

// components/admin/shared/admin-header.tsx
export function AdminHeader({ title, description, actions }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-gray-500 mt-1">{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  )
}

// app/admin/layout.tsx
import { AdminSidebar } from "@/components/admin/shared/admin-sidebar"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}

// app/admin/component-audit/page.tsx
import { AdminHeader } from "@/components/admin/shared/admin-header"
import { ComponentAudit } from "@/components/admin/component-audit/component-audit"

export default function ComponentAuditPage() {
  return (
    <>
      <AdminHeader 
        title="Component Audit" 
        description="Analyze and optimize your component usage" 
      />
      <ComponentAudit />
    </>
  )
}
`

