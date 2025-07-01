"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function DesignSystemAuditPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/admin/component-audit")
    }, 5000)

    return () => clearTimeout(redirectTimer)
  }, [router])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Page Moved</AlertTitle>
        <AlertDescription>
          The Design System Audit has been integrated into the Component Audit page. You will be redirected in 5
          seconds.
        </AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button onClick={() => router.push("/admin/component-audit")}>Go to Component Audit</Button>
      </div>
    </div>
  )
}
