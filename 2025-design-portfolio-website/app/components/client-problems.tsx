import { X } from "lucide-react"

interface ClientProblem {
  problem: string
}

export default function ClientProblems() {
  const problems: ClientProblem[] = [
    { problem: "Struggling with complex user interfaces that frustrate your customers" },
    { problem: "Dealing with low user adoption and high abandonment rates" },
    { problem: "Lacking a cohesive design system that scales across products" },
  ]

  return (
    <section className="py-24" aria-labelledby="client-problems-heading">
      <div className="w-full">
        <h2 id="client-problems-heading" className="text-4xl font-bold mb-8">
          Are you facing these challenges?
        </h2>

        <div className="space-y-4">
          {problems.map((item, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-6 py-4">
              <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full mr-4 flex items-center justify-center">
                <X className="h-4 w-4 text-red-500" />
              </div>
              <span className="text-gray-900 dark:text-gray-100 text-lg font-normal">{item.problem}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
