"use client"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import WorkExperience from "@/components/about/work-experience"
import Education from "@/components/about/education"
import BeyondDesign from "@/components/about/beyond-design"
import AboutSidebar from "@/components/about/about-sidebar"
import AboutCTA from "@/components/about/about-cta"

// Main content component for the About page
// Organizes the page sections and layout
export default function AboutPageContent() {
  // Navigation sections for the sidebar and scroll tracking
  const sections = [
    { id: "about", label: "About Me" },
    { id: "story", label: "My Story" },
    { id: "experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "beyond", label: "Beyond Design" },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 pl-0 pr-0">
      {/* Hero Section - Always at the top */}
      <div className="mb-16">
        <AboutHero />
      </div>

      {/* Main content grid with sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Sidebar Navigation - Between Hero and Content on mobile, right side on desktop */}
        <div className="md:col-span-1 md:col-start-3 md:row-start-1 mb-16 md:mb-0">
          <AboutSidebar sections={sections} />
        </div>

        {/* Main Content - After sidebar on mobile, left side on desktop */}
        <div className="md:col-span-2 md:col-start-1 md:row-start-1 space-y-16">
          {/* My Story */}
          <AboutStory />

          {/* Work Experience */}
          <WorkExperience />

          {/* Education Section */}
          <Education />

          {/* Personal Interests */}
          <BeyondDesign />

          {/* CTA Section */}
          <AboutCTA />
        </div>
      </div>
    </div>
  )
}
