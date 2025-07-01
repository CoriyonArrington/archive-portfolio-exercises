/**
 * ProjectProcessSection Component
 *
 * This component displays the design process for a specific project,
 * using a similar style to the process page but adapted for project context.
 */
import Image from "next/image"
import type { ProjectType } from "@/types/project"

interface ProcessStep {
  phase?: string
  title?: string
  description?: string
  steps?: {
    title: string
    description: string
  }[]
  outputs?: string[]
  results?: string[]
  insight?: {
    text: string
    author?: string
  }
}

interface ProjectProcessSectionProps {
  project: ProjectType
}

export function ProjectProcessSection({ project }: ProjectProcessSectionProps) {
  // Ensure process exists and is an array
  const processSteps: ProcessStep[] = Array.isArray(project.process)
    ? project.process
    : project.process
      ? [project.process]
      : []

  // Default process phases if none are provided
  if (processSteps.length === 0) {
    processSteps.push(
      {
        phase: "Discovery",
        description: "Understanding the problem through research and stakeholder interviews.",
      },
      {
        phase: "Design",
        description: "Creating solutions based on insights from the discovery phase.",
      },
      {
        phase: "Development",
        description: "Implementing the design with attention to detail and quality.",
      },
    )
  }

  return (
    <section className="mb-24">
      <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Design Process</h2>

      <div className="space-y-16">
        {processSteps.map((step, index) => (
          <div key={index} className="bg-purple-50/50 dark:bg-purple-950/20 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column: Phase details */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">{step.phase || "Process"} Phase</h3>
                <p className="text-lg font-medium mb-4">
                  {step.title || `Understanding the ${step.phase ? step.phase.toLowerCase() : "process"}`}
                </p>
                <p className="mb-6">
                  {step.description || "This phase helps establish a solid foundation for the project."}
                </p>

                {/* Process steps with numbers */}
                <div className="space-y-6">
                  {step.steps && step.steps.length > 0 ? (
                    step.steps.map((substep, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{substep.title}</h4>
                          <p className="text-muted-foreground">{substep.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No detailed steps available for this phase.</p>
                  )}
                </div>
              </div>

              {/* Right column: Image and outputs */}
              <div className="space-y-6">
                {/* Image */}
                <div className="relative aspect-video w-full mb-6">
                  <Image
                    src={
                      project.images && project.images[index + 1]
                        ? project.images[index + 1]
                        : `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(step.phase || "Process Phase")}`
                    }
                    alt={`${step.phase || "Process"} phase illustration`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Outputs and results */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Process outputs</h4>
                    <ul className="space-y-2">
                      {step.outputs && step.outputs.length > 0 ? (
                        step.outputs.map((output, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>{output}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>User interviews</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Research findings</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key results</h4>
                    <ul className="space-y-2">
                      {step.results && step.results.length > 0 ? (
                        step.results.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>{result}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Identified needs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Pain points</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Insight quote */}
                {step.insight && step.insight.text && (
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30 mt-4">
                    <blockquote className="italic text-sm">"{step.insight.text}"</blockquote>
                    {step.insight.author && (
                      <p className="text-right text-sm font-medium mt-2">— {step.insight.author}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Add default export that references the named export
export default ProjectProcessSection
