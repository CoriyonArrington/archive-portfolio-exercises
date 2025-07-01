/**
 * About Page Component
 *
 * This page provides information about the designer's background, experience, and approach.
 * It serves as the entry point for the About page and sets metadata for SEO.
 *
 * Accessibility features:
 * - Proper metadata for SEO
 */
import { PageHeader } from "@/components/shared/page-header"
import AboutPageClient from "./about-page-client"

export const metadata = {
  title: "About | Healthcare UX/UI Design Partner",
  description:
    "Learn how my unique background in biomedical engineering helps me create exceptional healthcare experiences for your users",
}

export default function AboutPage() {
  // Directly render the page content with the same structure as the Process page
  return (
    <div>
      <div className="container pt-8 md:pt-12 px-0">
        <PageHeader
          title="About me"
          description="I'm a Senior Product Designer with a unique background in biomedical engineering and a passion for creating healthcare solutions that improve lives and drive business growth."
        />
        <AboutPageClient />
      </div>
    </div>
  )
}
