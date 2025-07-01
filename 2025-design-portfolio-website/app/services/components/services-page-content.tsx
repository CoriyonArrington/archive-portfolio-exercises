/**
 * Services Page Content Component
 *
 * This component contains the main content sections of the Services page.
 * It's separated from the page component to improve code organization and maintainability.
 *
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper section labeling
 * - Clear content organization
 */
import { Suspense } from "react"
import ServiceSolutions from "@/components/services/service-solutions"
import EngagementModels from "@/components/services/engagement-models"
import ServicesFAQ from "@/components/services/services-faq"
import ServicesCTA from "@/components/services/services-cta"
import { getServices } from "@/lib/data/services"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ServicesPageContent() {
  const services = await getServices()

  return (
    <div className="grid grid-cols-1 gap-8 md:gap-12">
      {/* Service Solutions Section */}
      <section aria-labelledby="service-solutions-heading">
        <Suspense fallback={<ServiceSolutionsSkeleton />}>
          <ServiceSolutions services={services} />
        </Suspense>
      </section>

      {/* Engagement Models Section */}
      <section aria-labelledby="engagement-models-heading">
        <EngagementModels />
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="services-faq-heading">
        <ServicesFAQ />
      </section>

      {/* CTA Section */}
      <section aria-labelledby="services-cta-heading">
        <ServicesCTA />
      </section>
    </div>
  )
}

function ServiceSolutionsSkeleton() {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="container">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-6 space-y-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
