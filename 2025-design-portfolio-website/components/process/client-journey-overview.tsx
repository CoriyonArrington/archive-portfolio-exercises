"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { getProcessSteps, fallbackProcessSteps } from "@/lib/process-steps"
import type { ProcessStep } from "@/types/process-step"

function ProcessStepSkeleton() {
  return (
    <div className="space-y-24">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-4" />

              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-8 w-8 rounded-full mr-4" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                </div>
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ClientJourneyOverview() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProcessSteps() {
      try {
        setIsLoading(true)
        const steps = await getProcessSteps()
        setProcessSteps(steps)
      } catch (error) {
        console.error("Error loading process steps:", error)
        setProcessSteps(fallbackProcessSteps)
      } finally {
        setIsLoading(false)
      }
    }

    loadProcessSteps()
  }, [])

  if (isLoading) {
    return <ProcessStepSkeleton />
  }

  return (
    <div className="space-y-24">
      {processSteps.map((step, index) => (
        <div key={step.id} id={`phase-${index + 1}`} className="bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Phase details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-bold">{step.phaseTitle}</h3>
              </div>

              <p className="text-lg font-medium">{step.subtitle || `Understanding your needs`}</p>

              <p className="text-muted-foreground">{step.phaseDescription}</p>

              {/* Process steps with bullets */}
              <div className="space-y-4">
                {step.steps.map((item, stepIndex) => (
                  <div key={stepIndex} className="flex items-start">
                    <CheckCircle2 className="text-purple-600 h-5 w-5 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: Image and outputs */}
            <div className="space-y-6">
              {/* Image */}
              <div className="rounded-lg overflow-hidden border border-purple-200 dark:border-purple-800 shadow-md">
                <Image
                  src={step.imageUrl || "/placeholder.svg"}
                  alt={`Illustration of ${step.phaseTitle} phase`}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Quote */}
              {step.quote && (
                <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <blockquote className="italic mb-2">"{step.quote.text}"</blockquote>
                  <p className="text-sm font-medium">— {step.quote.author}</p>
                </div>
              )}

              {/* Outputs and insights */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Typical outputs</h4>
                  <ul className="space-y-2">
                    {step.outputs?.map((output, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Key insights</h4>
                  <ul className="space-y-2">
                    {step.insights?.map((insight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
