"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getProcessStepsForDisplay, type ProcessStep } from "@/lib/process-steps"
import { Check } from "lucide-react"

export function ProcessSteps() {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProcessSteps() {
      try {
        const steps = await getProcessStepsForDisplay()
        setProcessSteps(steps)
      } catch (err) {
        console.error("Error fetching process steps:", err)
        setError("Failed to load process steps")
      } finally {
        setLoading(false)
      }
    }

    fetchProcessSteps()
  }, [])

  if (loading) {
    return <div className="py-12">Loading process steps...</div>
  }

  if (error) {
    return <div className="py-12 text-red-500">{error}</div>
  }

  if (processSteps.length === 0) {
    return <div className="py-12">No process steps found.</div>
  }

  // Fallback process data in case the API fails
  const fallbackProcessData = [
    {
      id: "1",
      phaseTitle: "Discovery Phase",
      phaseSubtitle: "Understanding the problem",
      phaseDescription:
        "Every great solution starts with a deep understanding of the problem. During this phase, I immerse myself in the user's world to uncover their needs, pain points, and motivations.",
      icon: "search",
      imageUrl:
        "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//2d0oy5oupbq_1741726758183.jpg",
      outputs: [
        "Stakeholder interviews",
        "User personas",
        "Journey maps",
        "Problem statement",
        "Design brief",
        "Research report",
      ],
      keyResults: [
        "Reduce development costs by identifying issues early",
        "Increase user satisfaction and retention",
        "Validate design decisions with real user data",
      ],
      statValue: "92%",
      statLabel: "of projects start with clear user needs identified",
    },
    {
      id: "2",
      phaseTitle: "Design Phase",
      phaseSubtitle: "Creating the solution",
      phaseDescription:
        "With a clear understanding of the problem space, I explore multiple solutions through collaborative ideation, focusing on both innovative thinking and practical constraints.",
      icon: "palette",
      imageUrl:
        "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//6ns6qsyyulj_1741726395528.jpg",
      outputs: [
        "User flows",
        "Wireframes",
        "Interactive prototypes",
        "Design system",
        "Usability test results",
        "Design specifications",
      ],
      keyResults: [
        "Increase design iteration speed by 40%",
        "Reduce implementation questions by 65%",
        "Improve user task completion rates",
      ],
      statValue: "85%",
      statLabel: "task completion rate in usability testing",
    },
    {
      id: "3",
      phaseTitle: "Delivery Phase",
      phaseSubtitle: "Bringing designs to life",
      phaseDescription:
        "Design doesn't end with handoff. I work closely with development teams to ensure the design vision is realized in the final product and measure its impact.",
      icon: "rocket",
      imageUrl:
        "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//drmwteduji4_1741726385661.jpg",
      outputs: [
        "Design specifications",
        "Asset library",
        "Implementation guide",
        "QA checklist",
        "Analytics dashboard",
        "Post-launch report",
      ],
      keyResults: [
        "Reduce development time by 30%",
        "Decrease support tickets by 45%",
        "Increase user engagement metrics",
      ],
      statValue: "40%",
      statLabel: "increase in user engagement post-launch",
    },
  ]

  // Use API data if available, otherwise fallback to hardcoded data
  const processData = processSteps.length > 0 ? processSteps : fallbackProcessData

  // Helper function to split array into chunks
  const chunkArray = (arr: any[], size: number) => {
    if (!Array.isArray(arr)) return [[], []]
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
  }

  return (
    <section className="pb-12">
      <div className="max-w-6xl">
        <div className="space-y-8">
          {processData.map((step, index) => {
            // Ensure outputs and keyResults are arrays
            const outputs = Array.isArray(step.outputs) ? step.outputs : []
            const keyResults = Array.isArray(step.keyResults) ? step.keyResults : []

            // Split outputs into two columns
            const outputColumns = chunkArray(outputs, Math.ceil(outputs.length / 2))

            return (
              <div
                key={step.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white dark:bg-black transition-all duration-300 hover:shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left content */}
                  <div className="lg:col-span-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{step.phaseTitle}</h3>
                        <p className="text-purple-600 dark:text-purple-400">{step.phaseSubtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-8">{step.phaseDescription}</p>

                    <div className="mb-8">
                      <h3 className="font-bold mb-4">Deliverables:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        {outputColumns.map((column, colIndex) => (
                          <div key={colIndex} className="space-y-3">
                            {column.map((output, idx) => (
                              <div key={idx} className="flex items-start">
                                <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                                <span>{output}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                      <h3 className="font-bold mb-3">Key outcomes:</h3>
                      <ul className="space-y-2">
                        {keyResults.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3" aria-hidden="true"></div>
                            <span className="text-gray-700 dark:text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>

                      {step.statValue && (
                        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                          <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {step.statValue}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">{step.statLabel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right image - wider column and full height */}
                  <div className="lg:col-span-6">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-full flex items-center justify-center overflow-hidden">
                      {step.imageUrl ? (
                        <div className="relative w-full h-full" style={{ minHeight: "100%" }}>
                          <Image
                            src={step.imageUrl || "/placeholder.svg"}
                            alt={`Illustration for ${step.phaseTitle}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      ) : (
                        <div className="p-12 text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mx-auto text-gray-400"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                          <p className="mt-4 text-gray-500">Image placeholder</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
