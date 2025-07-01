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
import type { Metadata } from "next"
import { Suspense } from "react"

import { SectionHeading } from "@/components/shared/section-heading"
import HomeHero from "@/components/home/home-hero"
import ServiceOverview from "@/components/home/service-overview"
import ProcessOverview from "@/components/home/process-overview"
import FeaturedProjects from "@/components/home/featured-projects"
import { FeaturedTestimonial } from "@/components/home/featured-testimonial"
import AboutSection from "@/components/home/about-section"
import CTASection from "@/components/shared/cta-section"
import { ProjectsLoadingFallback, SectionLoadingFallback } from "@/components/ui/loading-fallbacks"
import ClientProblemsAndSolutions from "@/components/home/client-problems-solutions"

// Add metadata to help browsers identify the LCP element
export const metadata: Metadata = {
  title: "Healthcare UX/UI Design Partner | Specialized Design Solutions",
  description:
    "Expert UX/UI design for healthcare technology companies looking to create intuitive, effective digital experiences",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Why My UX Design Studio */}
      <section className="py-24" aria-labelledby="why-ux-heading">
        <SectionHeading
          title="Confusing UX drives users away—even when your product works."
          description="Most people don't leave because your product lacks features. They leave because it feels clunky, unclear, or just too hard to use. We focus on designing experiences that feel effortless, familiar, and human—so users stay longer and come back often. I’ve worked with local shops, mission-driven founders, and enterprise teams to improve UX with empathy and clarity."
          id="why-ux-heading"
        />
        <ClientProblemsAndSolutions />
        {/* Add content for Why My UX Design Studio section here */}
      </section>

      {/* 3. Testimonials / Social Proof */}
      <section className="py-24 -mx-4 px-4" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What Our Clients Say" description="" id="testimonials-heading" />
          <Suspense fallback={<SectionLoadingFallback />}>
            <FeaturedTestimonial featuredOnly={true} />
          </Suspense>
        </div>
      </section>

      {/* 4. Services */}
      <section className="py-24" aria-labelledby="services-heading">
        <SectionHeading
          title="You're not just building features—you’re building experiences."
          description="Too often, product design gets reduced to “making it look nice.” But aesthetics alone won’t help users understand, trust, or love your product. We combine strategy, research, and thoughtful UX to make sure your product works—before it even launches. Whether you're a solo founder or an internal product team, we’ll meet you where you are."
          id="services-heading"
        />
        <Suspense fallback={<SectionLoadingFallback />}>
          <ServiceOverview />
        </Suspense>
      </section>

      {/* 5. Process */}
      <section className="py-24" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Design shouldn’t feel like a black box."
            description="A lot of design work happens behind closed doors—leaving you unclear about what’s happening or why. That slows down teams and wastes valuable time. We keep the process collaborative and transparent—so you always know what we’re designing, how it’s solving the problem, and what comes next. This approach has helped founders launch faster and teams align more clearly across engineering, product, and marketing."
            id="process-heading"
          />
          <Suspense fallback={<SectionLoadingFallback />}>
            <ProcessOverview />
          </Suspense>
        </div>
      </section>

      {/* 6. Case Studies / Portfolio */}
      <section className="py-24" aria-labelledby="featured-work-heading">
        <SectionHeading
          title="Real results from real design work."
          description="Design should lead to better outcomes—not just nicer screens. But many portfolios show pixels with no context. We highlight the before, after, and why—so you can see exactly how UX strategy and design helped these businesses grow. Each story reflects a real challenge we solved through collaboration and clarity."
          id="featured-work-heading"
        />
        <Suspense fallback={<ProjectsLoadingFallback />}>
          <FeaturedProjects featuredOnly={true} />
        </Suspense>
      </section>

      {/* 7. About Section */}
      <section className="py-24" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Design that puts people first. Always."
            description="Many digital products are built without enough input from the people who use them. That leads to confusing UX, messy interfaces, and frustrated teams. I started this studio to create products that feel good to use—through research, clarity, and a deep respect for the end user. Over the years, I’ve worked with clients across health, wellness, education, and tech to bring that vision to life."
            id="about-heading"
          />
          <Suspense fallback={<SectionLoadingFallback />}>
            <AboutSection />
          </Suspense>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-24 mb-12" aria-labelledby="cta-heading">
        <CTASection
          title="Let’s build something meaningful."
          description="Your users deserve a better experience. And you deserve a design partner who actually listens. Let’s simplify what’s not working—and make something that works beautifully. I’ll bring the process, the pixels, and the UX thinking to help you get there."
          buttonText="Book a free consult"
          buttonLink="/contact"
        />
      </section>
    </main>
  )
}
