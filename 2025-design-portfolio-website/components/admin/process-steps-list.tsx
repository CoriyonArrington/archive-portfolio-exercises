"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteProcessStep } from "@/app/admin/actions/process-step-actions"
import { useRouter } from "next/navigation"
import type { ProcessStep } from "@/types/process-steps"

interface ProcessStepsListProps {
  processSteps: ProcessStep[]
}

export function ProcessStepsList({ processSteps }: ProcessStepsListProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this process step?")) {
      setIsDeleting(id)
      setError(null)

      try {
        const result = await deleteProcessStep(id)

        if (!result.success) {
          throw new Error(result.error || "Failed to delete process step")
        }

        router.refresh()
      } catch (err: any) {
        console.error("Error deleting process step:", err)
        setError(err.message || "Failed to delete process step")
      } finally {
        setIsDeleting(null)
      }
    }
  }

  if (processSteps.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <p className="text-muted-foreground mb-4">No process steps found.</p>
        <Button asChild>
          <Link href="/admin/process-steps/new">Add Your First Process Step</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Display Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processSteps.map((step) => (
            <TableRow key={step.id}>
              <TableCell className="font-medium">{step.phase_title}</TableCell>
              <TableCell>{step.phase_subtitle}</TableCell>
              <TableCell>{step.display_order}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/process-steps/${step.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(step.id)}
                    disabled={isDeleting === step.id}
                  >
                    {isDeleting === step.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
