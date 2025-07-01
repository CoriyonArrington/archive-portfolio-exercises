import { getProcessSteps } from "@/lib/data/process"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProcessStepsList } from "@/components/admin/process-steps-list"

export const dynamic = "force-dynamic"

export default async function ProcessStepsPage() {
  const processSteps = await getProcessSteps()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Steps</h1>
          <p className="text-muted-foreground">Manage the steps in your design process.</p>
        </div>
        <Button asChild>
          <Link href="/admin/process-steps/new">Add Process Step</Link>
        </Button>
      </div>

      <ProcessStepsList processSteps={processSteps} />
    </div>
  )
}
