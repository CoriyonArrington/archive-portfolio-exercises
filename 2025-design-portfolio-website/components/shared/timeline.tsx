interface TimelineItem {
  year: string
  role: string
  company: string
  description: string
  achievements: string[]
  image?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-12">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="md:w-1/3">
            <div className="text-lg font-medium text-green-500">{item.year}</div>
            <h3 className="text-xl font-semibold mt-1">{item.role}</h3>
            <div className="text-muted-foreground mt-1">{item.company}</div>

            {/* Use Supabase image with emoji fallback */}
            <div className="mt-4 relative w-full h-48 rounded-md overflow-hidden border border-muted bg-muted/50">
              {item.company === "HealthTech Innovations" ? (
                <img
                  src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//bju33h2432_1741740888680.png"
                  alt={`${item.role} at ${item.company}`}
                  className="w-full h-full object-cover object-[center_30%]"
                  onError={(e) => {
                    console.error(`Failed to load image for ${item.company}`)
                    // Replace with emoji fallback on error
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.classList.add("flex", "items-center", "justify-center")
                      const fallback = document.createElement("div")
                      fallback.className = "text-4xl"
                      fallback.textContent = "💼"
                      parent.appendChild(fallback)
                    }
                  }}
                />
              ) : item.company === "MedSolutions Inc." ? (
                <img
                  src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//7z507tsdelk_1741745764952.JPG"
                  alt={`${item.role} at ${item.company}`}
                  className="w-full h-full object-cover object-[center_10%]"
                  style={{ objectPosition: "center 10%" }}
                  onError={(e) => {
                    console.error(`Failed to load image for ${item.company}`)
                    // Replace with emoji fallback on error
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.classList.add("flex", "items-center", "justify-center")
                      const fallback = document.createElement("div")
                      fallback.className = "text-4xl"
                      fallback.textContent = "🎨"
                      parent.appendChild(fallback)
                    }
                  }}
                />
              ) : item.company === "Healthcare Innovations Lab" ? (
                <img
                  src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//k66iffy638j_1741745267676.JPG"
                  alt={`${item.role} at ${item.company}`}
                  className="w-full h-full object-cover object-[center_40%]"
                  style={{ objectPosition: "center 40%" }}
                  onError={(e) => {
                    console.error(`Failed to load image for ${item.company}`)
                    // Replace with emoji fallback on error
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.classList.add("flex", "items-center", "justify-center")
                      const fallback = document.createElement("div")
                      fallback.className = "text-4xl"
                      fallback.textContent = "💻"
                      parent.appendChild(fallback)
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-4xl">
                    {item.role.includes("Senior") || item.role.includes("Lead")
                      ? "💼"
                      : item.role.includes("UX") || item.role.includes("Design")
                        ? "🎨"
                        : "💻"}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3">
            <p className="text-muted-foreground mb-4">{item.description}</p>

            {item.achievements && item.achievements.length > 0 && (
              <>
                <h4 className="font-medium mb-2">Key Achievements:</h4>
                <ul className="list-disc pl-5 space-y-1 marker:text-green-500">
                  {item.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

