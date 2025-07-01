/**
 * Documentation Improvements
 *
 * This provides recommendations for improving documentation
 */

export const documentationImprovements = {
    componentDocumentation: {
      title: "Component Documentation",
      description: "Add comprehensive documentation to all components",
      template: `
  /**
   * ProjectCard Component
   * 
   * Displays a card for a project with various display options.
   * 
   * @param {Project} project - The project data to display
   * @param {'default' | 'featured' | 'compact'} variant - The display variant
   * @param {boolean} showMeta - Whether to show metadata like client and duration
   * 
   * @example
   * <ProjectCard 
   *   project={project} 
   *   variant="featured" 
   *   showMeta={true} 
   * />
   */
  export function ProjectCard({ 
    project, 
    variant = 'default', 
    showMeta = true 
  }: ProjectCardProps) {
    // Component implementation
  }
  `,
    },
    readmeUpdates: {
      title: "README Updates",
      description: "Update README with comprehensive project documentation",
      sections: [
        "Project Overview",
        "Directory Structure",
        "Getting Started",
        "Development Workflow",
        "Component System",
        "Data Fetching",
        "Deployment",
        "Contributing Guidelines",
      ],
    },
    codeExamples: {
      title: "Code Examples",
      description: "Add usage examples for key components and utilities",
      example: `
  /**
   * Example: Creating a new page with testimonials
   */
  
  // app/(main)/testimonials/page.tsx
  import { TestimonialSection } from "@/components/sections/testimonials/testimonial-section"
  import { getTestimonials } from "@/lib/data/testimonials"
  
  export default async function TestimonialsPage() {
    const testimonials = await getTestimonials()
    
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Client Testimonials</h1>
        <TestimonialSection 
          testimonials={testimonials} 
          variant="grid" 
        />
      </div>
    )
  }
  `,
    },
  }
  
  