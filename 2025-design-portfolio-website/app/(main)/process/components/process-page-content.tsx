"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { getProcessSteps, fallbackProcessSteps } from "@/lib/process-steps"
import ProcessCTA from '@/components/sections/common/cta"
import ProcessCaseStudies from '@/components/sections/process/process-case-studies"
import type { ProcessStep } from "@/types/process-step"

function ProcessStepSkeleton() {
  return (
    <div className="relative pt-10 pb-20">
      <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800/50" />

      <div className="space-y-32">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="relative">
            <div className="absolute left-0 top-0">
              <div className="z-20 size-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-base font-bold">
                {index + 1}
              </div>
            </div>
            <div className="ml-16 grid auto-cols-fr grid-cols-1 gap-8 md:gap-12">
              <div>
                <div className="h-7 w-48 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-5 w-64 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-4 w-full max-w-md mb-2 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-4 w-full max-w-sm bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
              </div>
              <div className="overflow-hidden rounded-lg">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ step, index }: { step: ProcessStep; index: number }) {
  const { scrollYProgress } = useScroll({
    target: useRef(null),
    offset: ["start end", "start center"],
  })

  const backgroundColor = useTransform(scrollYProgress, [0.3, 0.6], ["#c084fc", "#9333ea"])

  return (
    <motion.div ref={useRef(null)} id={`phase-${index + 1}`} className="relative scroll-mt-24">
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
          <h3 className="text-2xl font-bold mb-2 md:text-3xl">{step.phaseTitle}</h3>
          <p className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-3">
            {step.subtitle || `Understanding your needs`}
          </p>
          <p className="text-muted-foreground max-w-2xl">{step.phaseDescription}</p>

          {step.steps && step.steps.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Key activities:</h4>
              <ul className="space-y-2 list-disc pl-5 marker:text-purple-500">
                {step.steps.map((substep, i) => (
                  <li key={i}>
                    <span className="font-medium">{substep.title}:</span> {substep.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.outputs && step.outputs.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Deliverables:</h4>
              <div className="flex flex-wrap gap-2">
                {step.outputs.map((output, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-300"
                  >
                    {output}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step.testimonial && (
            <div className="mt-8 border-l-4 border-purple-500 pl-4 italic text-muted-foreground">
              "{step.testimonial.quote}"
              <div className="mt-2 text-sm font-medium not-italic">— {step.testimonial.author}</div>
            </div>
          )}
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
    </motion.div>
  )
}

export default function ProcessPageContent() {
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
      <div className="relative">
        {/* Timeline connector - properly aligned with dots */}
        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800/50" />

        <div className="space-y-32">
          {processSteps.map((step, index) => (
            <TimelineItem key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Case Studies Section */}
      <ProcessCaseStudies />

      {/* CTA Section */}
      <ProcessCTA />
    </div>
  )
}

