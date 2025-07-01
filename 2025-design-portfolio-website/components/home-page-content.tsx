import ClientProblems from "@/components/client-problems"
import HeroSection from "@/components/home/hero-section"
import FeaturedProjects from "@/components/home/featured-projects"
import TestimonialSection from "@/components/home/testimonial-section"
import ProcessSection from "@/components/process-section"
import CalendlySection from "@/components/home/calendly-section"

export default function HomePageContent() {
  // Define challenges for ClientProblems component
  const challenges = [
    {
      title: "Outdated Design",
      description:
        "Your website looks like it's from a bygone era, making your brand appear outdated and unprofessional.",
      icon: "Palette",
    },
    {
      title: "Poor User Experience",
      description: "Visitors struggle to navigate your site, leading to frustration and high bounce rates.",
      icon: "Users",
    },
    {
      title: "Not Mobile-Friendly",
      description: "Your site breaks on mobile devices, alienating a huge portion of your potential audience.",
      icon: "Smartphone",
    },
    {
      title: "Slow Loading Times",
      description: "Every second of load time costs you conversions and damages your search rankings.",
      icon: "Clock",
    },
    {
      title: "Unclear Messaging",
      description: "Visitors don't immediately understand what you offer or why they should choose you.",
      icon: "MessageSquare",
    },
    {
      title: "Low Conversion Rates",
      description: "Your site fails to turn visitors into leads or customers, wasting your marketing efforts.",
      icon: "TrendingUp",
    },
  ]

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ClientProblems challenges={challenges} />
      <ProcessSection />
      <TestimonialSection />
      <CalendlySection />
    </>
  )
}
