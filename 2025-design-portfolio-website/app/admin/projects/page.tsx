import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectList } from "@/components/admin/project-list"

export default async function ProjectsPage() {
  // We'll fetch projects client-side in the ProjectList component
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>Add New Project</Button>
        </Link>
      </div>

      <ProjectList />
    </div>
  )
}
