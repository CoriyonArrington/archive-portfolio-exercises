import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProcessStepById, deleteProcessStepAction } from "@/app/actions/process-step-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Delete Process Step",
  description: "Delete an existing process step",
}

export default async function DeleteProcessStepPage({ params }: { params: { id: string } }) {
  const processStep = await getProcessStepById(params.id)

  if (!processStep) {
    notFound()
  }

  async function handleDeleteProcessStep() {
    "use server"
    await deleteProcessStepAction(params.id)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Delete Process Step</h1>
        <p className="text-muted-foreground">
          Are you sure you want to delete this process step? This action cannot be undone.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Confirm Deletion</CardTitle>
          <CardDescription>You are about to delete the process step "{processStep.phase_title}".</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Title:</span> {processStep.phase_title}
            </div>
            <div>
              <span className="font-medium">Subtitle:</span> {processStep.phase_subtitle || "—"}
            </div>
            <div>
              <span className="font-medium">Display Order:</span> {processStep.display_order}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/process-steps">
            <Button variant="outline">Cancel</Button>
          </Link>
          <form action={handleDeleteProcessStep}>
            <Button type="submit" variant="destructive">
              Delete Process Step
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
