"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteProcessStep } from "@/app/actions/process-step-actions"

interface DeleteProcessStepButtonProps {
  id: string
}

export function DeleteProcessStepButton({ id }: DeleteProcessStepButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteProcessStep(id)
      router.push("/admin/process")
      router.refresh()
    } catch (error) {
      console.error("Error deleting process step:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={() => router.push("/admin/process")}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Process Step"}
      </Button>
    </div>
  )
}
