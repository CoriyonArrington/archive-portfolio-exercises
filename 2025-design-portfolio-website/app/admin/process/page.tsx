import type { Metadata } from "next"
import Link from "next/link"
import { getProcessSteps } from "@/lib/data/process"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import { ProcessStepsList } from "@/components/admin/process-steps-list"

export const metadata: Metadata = {
  title: "Process Steps Management",
  description: "Manage your design process steps",
}

export const dynamic = "force-dynamic"

export default async function ProcessStepsPage() {
  const processSteps = await getProcessSteps()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Steps</h1>
          <p className="text-muted-foreground">Manage your design process steps that appear on the services page.</p>
        </div>
        <Link href="/admin/process-steps/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Process Step
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Process Steps</CardTitle>
          <CardDescription>
            A list of all process steps in your portfolio. You can add, edit, or delete process steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProcessStepsList processSteps={processSteps} />
        </CardContent>
      </Card>
    </div>
  )
}
