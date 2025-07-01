/**
 * About Page Content Component
 *
 * This component contains the main content sections of the About page.
 * It's separated from the page component to improve code organization and maintainability.
 *
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper section labeling
 * - Clear content organization
 */
import AboutStory from '@/components/sections/about/about-story"
import WorkExperience from '@/components/sections/about/work-experience"
import Education from '@/components/sections/about/education"
import BeyondDesign from '@/components/sections/about/beyond-design"
import AboutCTA from '@/components/sections/common/cta"

export default function AboutPageContent() {
  return (
    <div className="grid grid-cols-1 gap-12 md:gap-16">
      {/* Personal story and background */}
      <section aria-labelledby="about-story-heading">
        <AboutStory />
      </section>

      {/* Work experience timeline */}
      <section aria-labelledby="work-experience-heading">
        <WorkExperience />
      </section>

      {/* Education background */}
      <section aria-labelledby="education-heading">
        <Education />
      </section>

      {/* Beyond design interests */}
      <section aria-labelledby="beyond-design-heading">
        <BeyondDesign />
      </section>

      {/* Call to action */}
      <section aria-labelledby="about-cta-heading">
        <AboutCTA />
      </section>
    </div>
  )
}

