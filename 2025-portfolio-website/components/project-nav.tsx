import type React from "react"
import Link from "next/link"

interface ProjectNavProps {
  currentProjectId: string
}

const projects = [
  { id: "1", slug: "health-track-app", title: "HealthTrack Mobile App" },
  { id: "2", slug: "med-connect-platform", title: "MedConnect Platform" },
]

const findNextAndPrevious = (currentProjectId: string) => {
  const currentIndex = projects.findIndex((project) => project.id === currentProjectId)

  const previousIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0

  return {
    previous: projects[previousIndex],
    next: projects[nextIndex],
  }
}

const ProjectNav: React.FC<ProjectNavProps> = ({ currentProjectId }) => {
  const { previous, next } = findNextAndPrevious(currentProjectId)

  return (
    <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Link href={`/work/${previous.slug}`} className="flex items-center justify-start">
        <span className="mr-2">←</span>
        <span>Previous Project: {previous.title}</span>
      </Link>
      <Link href={`/work/${next.slug}`} className="flex items-center justify-end">
        <span>Next Project: {next.title}</span>
        <span className="ml-2">→</span>
      </Link>
    </div>
  )
}

export default ProjectNav
