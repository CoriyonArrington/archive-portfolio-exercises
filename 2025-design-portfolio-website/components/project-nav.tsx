import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectNavProps {
  currentProjectId: string
}

export default function ProjectNav({ currentProjectId }: ProjectNavProps) {
  // Mock project data - would come from Supabase in production
  const projects = [
    { id: "1", title: "HealthTrack Mobile App", slug: "health-track-app" },
    { id: "2", title: "MedConnect Platform", slug: "med-connect-platform" },
    { id: "3", title: "BioWearable Dashboard", slug: "bio-wearable-dashboard" },
    { id: "4", title: "Patient Portal Redesign", slug: "patient-portal-redesign" },
    { id: "5", title: "MedDispense System", slug: "med-dispense-system" },
    { id: "6", title: "Health Education Platform", slug: "health-education-platform" },
  ]

  const currentIndex = projects.findIndex((project) => project.id === currentProjectId)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="flex justify-between items-center border-t pt-8">
      {prevProject ? (
        <Button asChild variant="outline">
          <Link href={`/work/${prevProject.slug}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Previous:</span> {prevProject.title}
          </Link>
        </Button>
      ) : (
        <div></div>
      )}
      {nextProject ? (
        <Button asChild variant="outline">
          <Link href={`/work/${nextProject.slug}`} className="flex items-center">
            <span className="hidden sm:inline">Next:</span> {nextProject.title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  )
}
