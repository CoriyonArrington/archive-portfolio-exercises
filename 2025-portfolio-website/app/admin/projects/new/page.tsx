import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { createProject } from "@/app/admin/projects/actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Project</h1>
          <p className="text-muted-foreground">Create a new portfolio project</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Enter the information about your project</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" required placeholder="e.g. HealthTrack Mobile App" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" name="slug" required placeholder="e.g. health-track-app" />
                <p className="text-xs text-muted-foreground">This will be used in the URL: /work/your-slug</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" name="description" required placeholder="A brief description of the project" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" name="client" required placeholder="e.g. HealthTech Innovations" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" name="year" required placeholder="e.g. 2023" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" name="role" required placeholder="e.g. Lead Product Designer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Project Duration</Label>
                <Input id="duration" name="duration" required placeholder="e.g. 6 months" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenge">The Challenge</Label>
              <Textarea
                id="challenge"
                name="challenge"
                required
                placeholder="Describe the problem you were trying to solve"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">The Solution</Label>
              <Textarea id="solution" name="solution" required placeholder="Describe your approach and solution" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="outcomes">Outcomes & Impact</Label>
              <Textarea
                id="outcomes"
                name="outcomes"
                required
                placeholder="List each outcome on a new line"
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">Enter each outcome on a new line</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" required placeholder="e.g. UX Research, UI Design, Mobile App" />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="featured" name="featured" />
              <Label htmlFor="featured">Feature this project on the homepage</Label>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/admin/projects">Cancel</Link>
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

