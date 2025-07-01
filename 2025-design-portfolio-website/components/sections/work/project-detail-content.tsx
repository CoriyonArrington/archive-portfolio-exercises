/**
 * ProjectDetailContent Component
 *
 * This component fetches and displays detailed information about a specific project.
 * It's a server component that fetches data from Supabase based on the slug.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling
 * - Descriptive link text and button labels
 * - Proper image alt text
 */
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProjectFooterNav from "@/components/projects/project-footer-nav"
import { getProjectBySlug } from "@/lib/projects"
import { formatString } from "@/lib/utils/format-string"
import ProjectProcessSection from "@/components/projects/project-process-section"

// Define types for process steps
// interface ProcessStep {
//   phase: string
//   description: string
// }

export default async function ProjectDetailContent({ slug }: { slug: string }) {
  // Get project data by slug from Supabase
  const project = await getProjectBySlug(slug)

  // If project not found, show 404 page
  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Back button and download case study */}
      <div className="flex justify-between items-center mb-12">
        <Button asChild variant="ghost">
          <Link href="/work" aria-label="Back to all projects">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to Projects
          </Link>
        </Button>
        <Button variant="outline" aria-label={`Download ${project.title} case study`}>
          <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Download Case Study
        </Button>
      </div>

      {/* Project header */}
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <section className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">{project.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">CLIENT</h3>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">YEAR</h3>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ROLE</h3>
                <p className="font-medium">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">DURATION</h3>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
          </section>

          {/* Hero image */}
          <section className="mb-16">
            <div className="relative aspect-video w-full">
              <Image
                src={project.images?.[0] || "/placeholder.svg"}
                alt={`${project.title} hero image showing the main interface design`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </section>

          {/* Challenge and Solution */}
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">The Challenge</h2>
              <p className="text-lg">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">The Solution</h2>
              <p className="text-lg">{project.solution}</p>
            </div>
          </section>

          {/* Process */}
          <ProjectProcessSection project={project} />

          {/* Additional images */}
          {project.images && project.images.length > 1 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Design Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} design highlight ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section className="mb-16 bg-muted p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Outcomes & Impact</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.outcomes.map((outcome: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div
                      className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    >
                      ✓
                    </div>
                    <p className="text-lg">{outcome}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar with project details */}
        <div>
          <div className="rounded-lg border p-6 sticky top-20">
            <h3 className="text-lg font-medium mb-4">Project Details</h3>

            <div className="space-y-6">
              {project.categories && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.categories) ? (
                      project.categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {formatString(category)}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary">{formatString(project.categories)}</Badge>
                    )}
                  </div>
                </div>
              )}

              {project.tools && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.tools) ? (
                      project.tools.map((tool, index) => (
                        <Badge key={index} variant="outline">
                          {formatString(tool)}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">{formatString(project.tools)}</Badge>
                    )}
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link
                    href={project.externalUrl || "#"}
                    target={project.externalUrl ? "_blank" : undefined}
                    aria-label={`${project.externalUrl ? "View live project" : "Project link not available yet"}`}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    View Live Project
                  </Link>
                </Button>

                <Button variant="outline" className="w-full" aria-label={`Download ${project.title} case study PDF`}>
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download Case Study PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next/Previous project navigation */}
      <ProjectFooterNav currentProjectId={project.id} />
    </>
  )
}

