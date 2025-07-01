import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProcessStepById } from "@/lib/data/process"
import { DeleteProcessStepButton } from "@/components/admin/delete-process-step-button"

export const metadata: Metadata = {
  title: "Delete Process Step",
  description: "Delete a design process step",
}

export default async function DeleteProcessStepPage({ params }: { params: { id: string } }) {
  const processStep = await getProcessStepById(params.id)

  if (!processStep) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Delete Process Step</h1>
        <p className="text-muted-foreground">Are you sure you want to delete this process step?</p>
      </div>

      <div className="rounded-md border p-4">
        <h2 className="text-xl font-semibold">{processStep.title}</h2>
        <p className="mt-2">{processStep.description}</p>
      </div>

      <DeleteProcessStepButton id={processStep.id} />
    </div>
  )
}
