"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getProcessSteps, fallbackProcessSteps } from "@/lib/process-steps"
import type { ProcessStep } from "@/types/process-step"

function ProcessStepSkeleton() {
  return (
    <div className="relative pb-20">
      <div className="absolute left-4 md:left-0 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800/50 md:ml-4" />

      <div className="space-y-24">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative">
            <div className="absolute left-0 top-0 flex items-center justify-center">
              <div className="z-20 size-12 rounded-full bg-gray-300 flex items-center justify-center" />
            </div>
            <div className="ml-16 mt-4 grid auto-cols-fr grid-cols-1 gap-8 md:gap-12">
              <div>
                <Skeleton className="h-7 w-48 mb-4" />
                <Skeleton className="h-5 w-64 mb-4" />
                <Skeleton className="h-4 w-full max-w-md mb-2" />
                <Skeleton className="h-4 w-full max-w-sm" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Skeleton className="aspect-video w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ step, index }: { step: ProcessStep; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "start center"],
  })

  const backgroundColor = useTransform(scrollYProgress, [0.3, 0.6], ["#c084fc", "#9333ea"])

  return (
    <div className="relative" ref={itemRef}>
      {/* Timeline dot with number */}
      <div className="absolute left-0 top-0">
        <motion.div
          className="z-20 size-12 rounded-full flex items-center justify-center text-white text-base font-bold"
          style={{ backgroundColor }}
        >
          {index + 1}
        </motion.div>
      </div>

      <div className="ml-16 grid auto-cols-fr grid-cols-1 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-2">{step.phaseTitle}</h3>
          <p className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-3">
            {step.subtitle || `Understanding your needs`}
          </p>
          <p className="text-muted-foreground max-w-xl">{step.phaseDescription}</p>
        </motion.div>

        {step.imageUrl && (
          <motion.div
            className="overflow-hidden rounded-lg border border-muted"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img
              src={step.imageUrl || "/placeholder.svg"}
              alt={`${step.phaseTitle} process illustration`}
              className="w-full h-full object-cover aspect-video"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=600"
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ProcessOverview() {
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

  // Display only the first 3 process steps on the home page
  const displayedSteps = isLoading ? [] : processSteps.slice(0, 3)

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative">
          {/* Timeline connector - properly aligned with dots */}
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800/50" />

          <div className="space-y-24">
            {displayedSteps.map((step, index) => (
              <TimelineItem key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
          <Button asChild variant="ghost" className="group">
            <Link href="/process">
              See full process <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
