"use client"

import { useState, useEffect } from "react"
import { getProcessStepsClient } from "@/lib/supabase/client-utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProcessStep {
  id: string
  title: string
  description: string
  order: number
  icon?: string
}

export default function ProcessOverview() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProcessSteps = async () => {
      try {
        const steps = await getProcessStepsClient()

        // Add a safety check before using .slice()
        if (steps && Array.isArray(steps)) {
          setProcessSteps(steps.slice(0, 4)) // Show first 4 steps
        } else {
          console.warn("Process steps data is not an array or is empty")
          setProcessSteps([])
        }
      } catch (error) {
        console.error("Error loading process steps:", error)
        setProcessSteps([])
      } finally {
        setLoading(false)
      }
    }

    loadProcessSteps()
  }, [])

  if (loading) {
    return <div className="py-24 text-center">Loading process steps...</div>
  }

  if (processSteps.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-muted/50" aria-labelledby="process-heading">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            My Process
          </h2>
          <Button asChild variant="ghost">
            <Link href="/process">
              View full process <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="bg-card rounded-lg p-6 h-full flex flex-col border border-border">
                <div className="text-primary mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

