"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { NotificationModal } from "../projects/notification-modal"

interface NotificationButtonProps {
  projectTitle: string
  projectId: string
}

export function NotificationButton({ projectTitle, projectId }: NotificationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="text-primary"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Get notified when ${projectTitle} launches`}
      >
        Get Notified <Bell className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectTitle={projectTitle}
        projectId={projectId}
      />
    </>
  )
}
