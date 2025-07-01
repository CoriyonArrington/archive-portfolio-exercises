import type React from "react"
import { X } from "lucide-react"

interface ClientProblemsProps {
  challenges: string[]
}

const ClientProblems: React.FC<ClientProblemsProps> = ({ challenges }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-8 text-white">Are you facing these challenges?</h2>
      {challenges.map((challenge, index) => (
        <div key={index} className="bg-red rounded-lg p-6 flex items-start gap-4">
          <div className="bg-red-500/20 p-2 rounded-full">
            <X className="h-5 w-5 text-red-500 shrink-0" />
          </div>
          <p className="text-white">{challenge}</p>
        </div>
      ))}
    </div>
  )
}

export default ClientProblems
