/**
 * ProcessOverview Component
 *
 * This component displays the designer's design process in detail,
 * including the discovery, design, and delivery phases.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling
 * - Numbered steps with both visual and text indicators
 * - Proper image alt text
 */
import Image from "next/image"

export default function ProcessOverview() {
  // Process phases data
  const processPhases = [
    {
      title: "Discovery Phase",
      subtitle: "Understanding the problem",
      description:
        "Every great solution starts with a deep understanding of the problem. During this phase, I immerse myself in the user's world to uncover their needs, pain points, and motivations.",
      steps: [
        {
          title: "Stakeholder interviews",
          description:
            "I interview key stakeholders to understand business goals, technical constraints, and success metrics.",
        },
        {
          title: "User research",
          description:
            "Through interviews, surveys, and contextual inquiry, I gain insights into user behaviors, needs, and frustrations.",
        },
        {
          title: "Market analysis",
          description:
            "I analyze competitor products and industry trends to identify opportunities and avoid common pitfalls.",
        },
        {
          title: "Synthesis",
          description: "I synthesize research findings into actionable insights that will guide the design process.",
        },
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//2d0oy5oupbq_1741726758183.jpg",
      quote: {
        text: "One persona we aren't doing well for yet... marketers. They don't want these tactical features. They need aggregated data to act on.",
        author: "Olivia Alexander, VP Product Management",
      },
      outputs: ["9 Stakeholder interviews", "User personas", "Jobs-to-be-done"],
      insights: ["Data accessibility issues", "Integration pain points", "Unmet stakeholder needs"],
      activities: [
        "Stakeholder interviews and workshops",
        "User interviews and surveys",
        "Competitive analysis",
        "Heuristic evaluation",
        "Journey mapping",
        "Persona development",
      ],
      deliverables: ["Research report", "User personas", "Journey maps", "Problem statement", "Design brief"],
    },
    {
      title: "Design Phase",
      subtitle: "Creating the solution",
      description:
        "With a clear understanding of the problem space, I explore multiple solutions through collaborative ideation, focusing on both innovative thinking and practical constraints.",
      steps: [
        {
          title: "Ideation",
          description:
            "I facilitate ideation workshops with cross-functional teams to explore a wide range of potential solutions.",
        },
        {
          title: "Information architecture",
          description:
            "I create user flows and information architecture to establish a solid foundation for the design.",
        },
        {
          title: "Prototyping",
          description:
            "I develop wireframes and interactive prototypes of increasing fidelity to visualize and test solutions.",
        },
        {
          title: "Usability testing",
          description: "I conduct usability testing to validate design decisions and identify areas for improvement.",
        },
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//6ns6qsyyulj_1741726395528.jpg",
      quote: {
        text: "The dashboard concept is promising, but users struggled to understand how to customize their views. We need to simplify this interaction.",
        author: "From usability testing notes",
      },
      outputs: ["User flows", "Wireframes", "Interactive prototypes"],
      insights: ["85% task completion", "3 critical usability issues", "5 design iterations"],
      activities: [
        "Design workshops",
        "Sketching and ideation",
        "Information architecture",
        "Wireframing",
        "Prototyping",
        "Usability testing",
        "Design critique sessions",
      ],
      deliverables: ["User flows", "Wireframes", "Interactive prototypes", "Design system", "Usability test results"],
    },
    {
      title: "Delivery Phase",
      subtitle: "Bringing designs to life",
      description:
        "Design doesn't end with handoff. I work closely with development teams to ensure the design vision is realized in the final product and measure its impact.",
      steps: [
        {
          title: "Design specifications",
          description: "I create detailed specifications and assets for developers to ensure accurate implementation.",
        },
        {
          title: "Implementation support",
          description:
            "I collaborate with developers throughout the build process, making pragmatic adjustments as needed.",
        },
        {
          title: "Quality assurance",
          description:
            "I conduct design QA throughout development to ensure the final product matches the design vision.",
        },
        {
          title: "Measurement & optimization",
          description: "After launch, I analyze user behavior and metrics to identify opportunities for improvement.",
        },
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//drmwteduji4_1741726385661.jpg",
      quote: {
        text: "The design system documentation was incredibly helpful. It made implementation much faster and more consistent across the team.",
        author: "James Chen, Lead Developer",
      },
      outputs: ["Design system", "Developer handoff", "Implementation guide"],
      insights: ["40% increase in user engagement", "35% reduction in support tickets", "92% user satisfaction"],
      activities: [
        "Design specifications",
        "Developer handoff",
        "Implementation support",
        "Design QA",
        "User feedback collection",
        "Analytics setup",
        "Post-launch optimization",
      ],
      deliverables: [
        "Design specifications",
        "Asset library",
        "Implementation guide",
        "QA checklist",
        "Analytics dashboard",
        "Post-launch report",
      ],
    },
  ]

  return (
    <section className="mb-24">
      <div className="space-y-32">
        {processPhases.map((phase, phaseIndex) => (
          <div
            key={phaseIndex}
            id={`phase-${phaseIndex + 1}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-purple-50/50 dark:bg-purple-950/20 p-8 rounded-lg"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-playfair">{phase.title}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">{phase.subtitle}</h3>
                  <p className="mb-6">{phase.description}</p>

                  <div className="space-y-6">
                    {phase.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex gap-4">
                        <div
                          className="bg-purple-600 text-purple-50 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          {stepIndex + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={phase.image || "/placeholder.svg"}
                  alt={`Visual representation of the ${phase.title.toLowerCase()} process`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="bg-purple-50/80 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <h4 className="font-bold mb-2">{phase.title} insights</h4>
                <blockquote className="italic text-muted-foreground mb-4">"{phase.quote.text}"</blockquote>
                <p className="text-sm">— {phase.quote.author}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50/80 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <h4 className="font-bold mb-2">Process outputs</h4>
                  <ul className="space-y-2">
                    {phase.outputs.map((output, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2" aria-hidden="true"></div>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50/80 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <h4 className="font-bold mb-2">Key results</h4>
                  <ul className="space-y-2">
                    {phase.insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2" aria-hidden="true"></div>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Additional sections for the process page */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-50/80 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <h4 className="font-bold mb-2">Activities</h4>
                  <ul className="space-y-2">
                    {phase.activities?.map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2" aria-hidden="true"></div>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50/80 dark:bg-purple-950/30 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <h4 className="font-bold mb-2">Deliverables</h4>
                  <ul className="space-y-2">
                    {phase.deliverables?.map((deliverable, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 mt-2" aria-hidden="true"></div>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
