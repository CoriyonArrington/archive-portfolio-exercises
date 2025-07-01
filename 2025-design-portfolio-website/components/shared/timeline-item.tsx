import type { TimelineItemProps } from "./types"

export function TimelineItem({ year, role, company, description, achievements }: Omit<TimelineItemProps, "image">) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4">
        <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[170px]">
          <div className="text-4xl">{role.includes("Senior") ? "💼" : role.includes("UX") ? "🎨" : "💻"}</div>
        </div>
        <div className="mt-3">
          <p className="font-medium text-primary">{year}</p>
          <h3 className="font-bold text-xl">{role}</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <p className="mb-4">{description}</p>

        {achievements && achievements.length > 0 && (
          <>
            <h4 className="font-semibold mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

