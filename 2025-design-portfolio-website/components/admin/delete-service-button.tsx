"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteServiceAction } from "@/app/actions/service-actions"

interface DeleteServiceButtonProps {
  id: string
}

export function DeleteServiceButton({ id }: DeleteServiceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setIsDeleting(true)
    setError(null)

    try {
      await deleteServiceAction(id)
    } catch (err) {
      console.error("Error deleting service:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setIsDeleting(false)
    }
  }

  return (
    <>
      {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Service"}
      </Button>
    </>
  )
}
