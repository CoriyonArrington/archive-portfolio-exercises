import { Suspense } from "react"
import HeroSection from "@/components/home/hero-section"
import FeaturedProjects from "@/components/home/featured-projects"
import ProcessOverview from "@/components/home/process-overview"
import TestimonialSection from "@/components/home/testimonial-section"
import CalendlySection from "@/components/home/calendly-section"
import ClientProblems from "./client-problems"
import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton for the testimonial section
function TestimonialSkeleton() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-10">
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-sm">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="flex items-center">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePageContent() {
  return (
    <main>
      <HeroSection />
      <ClientProblems />
      <FeaturedProjects />
      <ProcessOverview />
      <Suspense fallback={<TestimonialSkeleton />}>
        <TestimonialSection />
      </Suspense>
      <CalendlySection />
    </main>
  )
}
