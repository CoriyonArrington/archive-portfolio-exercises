import type { Metadata } from "next"
import { ProcessSteps } from '@/components/sections/process/process-steps'
import { ProcessHero } from '@/components/sections/common/process-hero'
import { ProcessCaseStudies } from '@/components/sections/process/process-case-studies'

export const metadata: Metadata = {
  title: "Process | Coriyon's Portfolio",
  description: "Learn about my design process and how I approach projects.",
}

export const dynamic = "force-dynamic" // Changed from force_dynamic to force-dynamic

export default function ProcessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProcessHero />
      <ProcessSteps />
      <ProcessCaseStudies />
    </div>
  )
}

