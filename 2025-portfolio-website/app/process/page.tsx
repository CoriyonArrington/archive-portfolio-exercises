import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProcessPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">My Design Process</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A systematic yet flexible approach to solving complex design challenges in healthcare technology, focusing on
          both user needs and business outcomes.
        </p>
      </section>

      {/* Process Overview */}
      <section className="mb-24">
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          <div className="space-y-24">
            {[
              {
                phase: "Discover",
                description:
                  "I begin by deeply understanding the problem space, user needs, and business objectives. This phase is about gathering insights that will inform the entire design process.",
                activities: [
                  "Stakeholder interviews to understand business goals and constraints",
                  "User research through interviews, surveys, and contextual inquiry",
                  "Competitive analysis to identify market opportunities",
                  "Review of existing data and analytics",
                ],
                tools: ["User Interviews", "Surveys", "Competitive Analysis", "Data Analytics"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "The quality of your research determines the quality of your design. I invest heavily in understanding before creating.",
              },
              {
                phase: "Define",
                description:
                  "With research insights in hand, I synthesize findings to clearly define the problem and establish a strategic direction for the design solution.",
                activities: [
                  "Creating user personas to represent key user groups",
                  "Mapping user journeys to identify pain points and opportunities",
                  "Defining success metrics that align user needs with business goals",
                  "Establishing design principles to guide decision-making",
                ],
                tools: ["Personas", "Journey Maps", "Affinity Diagrams", "Design Principles"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "A well-defined problem is half-solved. This phase creates the foundation for all design decisions that follow.",
              },
              {
                phase: "Ideate",
                description:
                  "This is where creativity meets strategy. I explore multiple solutions through collaborative ideation, focusing on both innovative thinking and practical constraints.",
                activities: [
                  "Facilitating ideation workshops with cross-functional teams",
                  "Sketching and concept development",
                  "Prioritizing ideas based on impact and feasibility",
                  "Creating information architecture and user flows",
                ],
                tools: ["Design Workshops", "Sketching", "User Flows", "Information Architecture"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "The best solutions emerge when we explore widely before narrowing. I encourage divergent thinking before convergent decision-making.",
              },
              {
                phase: "Prototype",
                description:
                  "Ideas come to life through iterative prototyping, allowing for early validation and refinement before significant resources are invested in development.",
                activities: [
                  "Creating wireframes to establish layout and functionality",
                  "Developing interactive prototypes of increasing fidelity",
                  "Conducting usability testing to validate design decisions",
                  "Iterating based on user feedback",
                ],
                tools: ["Wireframing", "Prototyping", "Usability Testing", "Design Critique"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "Prototypes are questions embodied. Each iteration answers questions and raises new ones, moving us closer to the optimal solution.",
              },
              {
                phase: "Design",
                description:
                  "With validated concepts, I create comprehensive designs that address both functional requirements and emotional aspects of the user experience.",
                activities: [
                  "Developing visual design systems that ensure consistency",
                  "Creating high-fidelity mockups for all states and interactions",
                  "Ensuring accessibility compliance throughout the design",
                  "Documenting design decisions and rationale",
                ],
                tools: ["Visual Design", "Design Systems", "Accessibility Testing", "Design Documentation"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "Good design is as much about emotion as function. I create experiences that not only work well but feel right to users.",
              },
              {
                phase: "Implement",
                description:
                  "Design doesn't end with handoff. I work closely with development teams to ensure the design vision is realized in the final product.",
                activities: [
                  "Creating detailed specifications for developers",
                  "Conducting design QA throughout development",
                  "Supporting developers with implementation questions",
                  "Making pragmatic adjustments as needed during build",
                ],
                tools: ["Design Specs", "Developer Handoff", "Design QA", "Implementation Support"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "The gap between design and development is where great ideas can falter. I bridge this gap through clear communication and collaboration.",
              },
              {
                phase: "Evaluate",
                description:
                  "After launch, I measure the impact of design changes against our success metrics, gathering insights that inform future improvements.",
                activities: [
                  "Analyzing user behavior through analytics",
                  "Conducting post-launch user research",
                  "Measuring performance against defined success metrics",
                  "Identifying opportunities for optimization",
                ],
                tools: ["Analytics", "User Feedback", "A/B Testing", "Heatmaps"],
                image: "/placeholder.svg?height=600&width=800",
                quote:
                  "Design is never truly finished. I believe in continuous improvement based on real-world performance data.",
              },
            ].map((phase, index) => (
              <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="hidden md:block absolute left-1/2 top-0 w-8 h-8 bg-primary text-primary-foreground rounded-full -translate-x-1/2 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className={`space-y-6 ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                  <h2 className="text-3xl font-bold font-playfair">{phase.phase}</h2>
                  <p className="text-lg">{phase.description}</p>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Activities:</h3>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Tools & Methods:</h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map((tool, i) => (
                        <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-primary pl-4 italic">{phase.quote}</blockquote>
                </div>
                <div className={`relative aspect-video ${index % 2 === 1 ? "md:col-start-1" : ""}`}>
                  <Image
                    src={phase.image || "/placeholder.svg"}
                    alt={`${phase.phase} phase illustration`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Principles */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-12 text-center">Guiding Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              principle: "User-Centered",
              description:
                "Every decision is made with the user's needs, goals, and context in mind. I advocate for the user throughout the process.",
            },
            {
              principle: "Evidence-Based",
              description:
                "Design decisions are grounded in research and data, not assumptions. I test hypotheses and measure outcomes.",
            },
            {
              principle: "Collaborative",
              description:
                "Great design emerges from diverse perspectives. I engage stakeholders and cross-functional teams throughout the process.",
            },
            {
              principle: "Iterative",
              description:
                "Design is refined through cycles of creation, testing, and improvement. Each iteration brings us closer to the optimal solution.",
            },
          ].map((item, index) => (
            <div key={index} className="border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">{item.principle}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Adaptation */}
      <section className="mb-24 bg-muted p-8 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">Process Adaptation</h2>
          <p className="text-lg mb-8">
            While I follow a structured process, I recognize that every project has unique needs. My approach is
            flexible and adaptable to:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
              <span>
                <strong>Project constraints:</strong> Timelines, budgets, and resources vary. I scale my process
                accordingly without compromising quality.
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
              <span>
                <strong>Team composition:</strong> I adapt to work effectively with your existing team, whether that's a
                full product team or a solo founder.
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
              <span>
                <strong>Project phase:</strong> Whether starting from scratch or improving an existing product, I tailor
                my approach to your current stage.
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
              <span>
                <strong>Regulatory requirements:</strong> Healthcare products often have specific compliance needs. I
                incorporate these considerations throughout the process.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-12 text-center">Process in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "HealthTrack Mobile App",
              description:
                "See how this process transformed a complex health tracking concept into an intuitive mobile experience with 92% user satisfaction.",
              image: "/placeholder.svg?height=600&width=800",
              slug: "health-track-app",
            },
            {
              title: "MedConnect Platform",
              description:
                "Discover how user research and iterative design created a telemedicine platform that increased provider efficiency by 35%.",
              image: "/placeholder.svg?height=600&width=800",
              slug: "med-connect-platform",
            },
          ].map((study, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <Button asChild variant="outline">
                  <Link href={`/work/${study.slug}`}>
                    View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">Ready to Experience This Process?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Let's apply this proven approach to your healthcare product challenges and create experiences that truly make
          a difference.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}

