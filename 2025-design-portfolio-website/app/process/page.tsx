import type { Metadata } from "next"
import { ProcessSteps } from "@/components/process/process-steps"
import { ProcessHero } from "@/components/process/process-hero"
import { ProcessCaseStudies } from "@/components/process/process-case-studies"

export const metadata: Metadata = {
  title: "Process | Coriyon's Portfolio",
  description: "Learn about my design process and how I approach projects.",
}

export const dynamic = "force-dynamic" // Changed from force_dynamic to force-dynamic

export default function ProcessPage() {
  return (
    <div className="container mx-auto px-0 py-8">
      <ProcessHero />
      <ProcessSteps />
      <ProcessCaseStudies />
    </div>
  )
}
