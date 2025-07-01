import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paintbrush, Code2, Trash2, RotateCcw } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Portfolio website administration",
}

export default function AdminDashboard() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paintbrush className="h-5 w-5" />
              Design System Management
            </CardTitle>
            <CardDescription>Maintain and evolve your design system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Tools for standardizing components, tracking implementation progress, and ensuring design consistency.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/admin/design-system/checklist">Manage Design System</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Code Maintenance
            </CardTitle>
            <CardDescription>Tools for maintaining code quality</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Run cleanup scripts, analyze unused code, and track technical debt.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/code-cleanup">
                <Trash2 className="h-4 w-4 mr-2" />
                Cleanup Tools
              </Link>
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Run v0-update.sh
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
