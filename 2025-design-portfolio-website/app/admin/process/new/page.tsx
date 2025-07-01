import type { Metadata } from "next"
import ProcessStepForm from "@/components/admin/process-step-form"

export const metadata: Metadata = {
  title: "Add New Process Step",
  description: "Add a new design process step",
}

export default function NewProcessStepPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Process Step</h1>
        <p className="text-muted-foreground">Create a new design process step for your services page.</p>
      </div>

      <ProcessStepForm />
    </div>
  )
}
