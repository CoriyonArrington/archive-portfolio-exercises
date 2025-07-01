"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DirectAccess() {
  const [copied, setCopied] = useState(false)
  const adminKey = "portfolio2025"

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Services", path: "/admin/services" },
    { name: "Projects", path: "/admin/projects" },
    { name: "FAQs", path: "/admin/faqs" },
    { name: "Process", path: "/admin/process" },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adminKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Direct Access</CardTitle>
          <CardDescription>Use these direct links to access admin pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>This is a temporary solution to help you access the admin area.</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <p className="text-sm font-medium">Your admin key:</p>
            <div className="flex items-center gap-2">
              <code className="bg-muted p-2 rounded text-sm flex-1">{adminKey}</code>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Direct access links:</p>
            <ul className="space-y-2">
              {adminLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={`${link.path}?admin-key=${adminKey}`}
                    className="text-blue-600 hover:underline block p-2 bg-muted rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            These links include a special key that bypasses the login requirement.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
