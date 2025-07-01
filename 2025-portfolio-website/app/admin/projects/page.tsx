import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/auth"
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { deleteProject } from "@/app/admin/projects/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function ProjectsPage() {
  const supabase = await createServerSupabaseClient()

  let projects: any[] = []
  let error = null

  try {
    const { data, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (fetchError) {
      error = fetchError.message
    } else {
      projects = data || []
    }
  } catch (err: any) {
    error = err.message || "An error occurred while fetching projects"
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.includes("does not exist")
              ? "The projects table does not exist yet. Please set up your database first."
              : error}
            <div className="mt-4">
              <Button asChild>
                <Link href="/admin/setup">Set Up Database</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6">
        {!error && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.client} • {project.year}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/projects/${project.id}`}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Link>
                    </Button>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <Button variant="outline" size="sm" type="submit" className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {typeof project.tags === "string"
                    ? JSON.parse(project.tags).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    : project.tags &&
                      Array.isArray(project.tags) &&
                      project.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                </div>
                {project.featured && (
                  <Badge className="mt-4" variant="default">
                    Featured
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))
        ) : !error ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No projects found</p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

