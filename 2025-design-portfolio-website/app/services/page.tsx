/**
 * Services Page Component
 *
 * This page displays the designer's service offerings with a client-focused approach,
 * highlighting solutions rather than just services.
 *
 * The page includes:
 * 1. Page header with title and description
 * 2. Service solutions with icons, descriptions, and deliverables
 * 3. Engagement models
 * 4. FAQ section
 * 5. Call-to-action section
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling
 * - Descriptive link text and button labels
 * - Proper image alt text
 */
import { Suspense } from "react"
import { PageHeader } from "@/components/shared/page-header"
import ServicesPageContent from "./components/services-page-content"
import { SectionLoadingFallback } from "@/components/ui/loading-fallbacks"

export const metadata = {
  title: "Services | Healthcare UX/UI Design Solutions",
  description:
    "Specialized design solutions for healthcare companies looking to create intuitive, effective digital experiences that solve real user problems",
}

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-10 pl-0 pr-0">
      {/* Page header with title and description */}
      <PageHeader
        title="Services"
        description="I help healthcare technology companies solve complex design challenges with user-centered solutions that improve patient outcomes and drive business growth."
      />

      <Suspense fallback={<SectionLoadingFallback />}>
        <ServicesPageContent />
      </Suspense>
    </main>
  )
}
