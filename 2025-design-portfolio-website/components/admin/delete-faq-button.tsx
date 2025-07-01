"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteFAQ } from "@/app/actions/faq-actions"

interface DeleteFAQButtonProps {
  id: string
}

export function DeleteFAQButton({ id }: DeleteFAQButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setIsDeleting(true)

    try {
      await deleteFAQ(id)
      router.push("/admin/faqs")
    } catch (error) {
      console.error("Error deleting FAQ:", error)
      setIsDeleting(false)
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Delete FAQ"}
    </Button>
  )
}
