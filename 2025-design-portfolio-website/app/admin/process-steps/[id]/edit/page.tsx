import { notFound } from "next/navigation"
import { getProcessStepById } from "@/lib/data/process"
import EditProcessStepClient from "./edit-process-step-client"

interface EditProcessStepPageProps {
  params: {
    id: string
  }
}

export default async function EditProcessStepPage({ params }: EditProcessStepPageProps) {
  const id = params?.id

  if (!id) {
    notFound()
  }

  const processStep = await getProcessStepById(id)

  if (!processStep) {
    notFound()
  }

  return <EditProcessStepClient processStep={processStep} id={id} />
}
