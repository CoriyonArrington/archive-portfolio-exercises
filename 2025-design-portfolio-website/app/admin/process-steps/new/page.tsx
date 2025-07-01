import type { Metadata } from "next"
import { NewProcessStepClient } from "./new-process-step-client"

export const metadata: Metadata = {
  title: "Create Process Step",
  description: "Create a new process step for your design portfolio.",
}

export default function NewProcessStepPage() {
  return <NewProcessStepClient />
}
