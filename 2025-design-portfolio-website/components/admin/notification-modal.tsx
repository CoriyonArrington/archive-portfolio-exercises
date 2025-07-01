"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"
import { useFocusTrap } from "@/lib/utils/focus-trap"
import { subscribeToProject } from "@/app/actions/subscribe-to-projects"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  projectId: string
}

export function NotificationModal({ isOpen, onClose, projectTitle, projectId }: NotificationModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const focusTrapRef = useFocusTrap(isOpen)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData and append the necessary values
      const formData = new FormData()
      formData.append("email", email)
      formData.append("projectId", projectId)
      formData.append("projectTitle", projectTitle)

      // Call the server action
      const result = await subscribeToProject(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })

        setEmail("")
        onClose()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Notification submission error:", error)
      toast({
        title: "Something went wrong.",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[90%] max-w-[90vw] rounded-lg bg-background p-6" ref={focusTrapRef}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" aria-hidden="true" />
            Get notified when this project launches
          </DialogTitle>
          <DialogDescription className="text-left">
            Enter your email address to receive updates about "{projectTitle}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <DialogFooter className="gap-3 flex-col sm:flex-row sm:justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Notify Me"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

