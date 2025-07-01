import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProcessStepById } from "@/lib/data/process"
import ProcessStepForm from "@/components/admin/process-step-form"

export const metadata: Metadata = {
  title: "Edit Process Step",
  description: "Edit a design process step",
}

export default async function EditProcessStepPage({ params }: { params: { id: string } }) {
  const processStep = await getProcessStepById(params.id)

  if (!processStep) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Process Step</h1>
        <p className="text-muted-foreground">Update an existing design process step.</p>
      </div>

      <ProcessStepForm processStep={processStep} isEditing />
    </div>
  )
}
