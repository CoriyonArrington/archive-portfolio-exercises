/**
 * Home Page Component
 *
 * This is the main landing page of the portfolio website.
 * It showcases the designer's expertise, featured work, and client testimonials.
 *
 * The page uses React Suspense for improved loading performance,
 * loading critical content first and deferring non-critical sections.
 *
 * Accessibility features:
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA landmarks for major sections
 * - Descriptive link text and button labels
 * - LCP element identified for performance optimization
 */
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

// Page sections
import HomeHero from "@/components/home/home-hero"
import ClientProblems from "@/components/home/client-problems"
import ServiceOverview from "@/components/home/service-overview"
import ProcessOverview from "@/components/home/process-overview"
import FeaturedProjects from "@/components/projects/featured-projects"
import CalendlySection from "@/components/home/calendly-section"
import { SuccessStories } from "@/components/home/success-stories"

// Loading fallbacks
import { ProjectsLoadingFallback, SectionLoadingFallback } from "@/components/ui/loading-fallbacks"

// Add metadata to help browsers identify the LCP element
export const metadata: Metadata = {
  title: "Healthcare UX/UI Design Partner | Specialized Design Solutions",
  description:
    "Expert UX/UI design for healthcare technology companies looking to create intuitive, effective digital experiences",
  other: {
    "LCP-element": "#main-heading", // Help browsers identify the LCP element
  },
}

export default function Home() {
  return (
    <main className="container mx-auto pl-0 pr-0">
      {/* Hero Section - Render immediately without waiting for data */}
      <HomeHero />

      {/* Featured Projects Section - Moved above Services section to match nav order */}
      <section className="mb-16" aria-labelledby="featured-work-heading">
        <div className="flex justify-between items-center mb-6">
          <h2 id="featured-work-heading" className="text-3xl md:text-4xl font-bold font-playfair">
            Featured work
          </h2>
          <Button asChild variant="ghost">
            <Link href="/work" aria-label="See all projects">
              See all projects <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<ProjectsLoadingFallback />}>
          <FeaturedProjects featured={true} />
        </Suspense>
      </section>

      {/* Client Problems Section - Focused on client challenges */}
      <ClientProblems />

      {/* Services Overview Section - Load after initial render */}
      <Suspense fallback={<SectionLoadingFallback />}>
        <ServiceOverview />
      </Suspense>

      {/* Process Overview - Shows how I work with clients */}
      <Suspense fallback={<SectionLoadingFallback />}>
        <ProcessOverview />
      </Suspense>

      {/* Success Stories Section - Featured Testimonials */}
      <Suspense fallback={<SectionLoadingFallback />}>
        <SuccessStories />
      </Suspense>

      {/* Calendly Integration Section */}
      <CalendlySection />
    </main>
  )
}

