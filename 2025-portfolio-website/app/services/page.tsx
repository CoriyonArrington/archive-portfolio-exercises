import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  // Service offerings data
  const services = [
    {
      title: "UX Research",
      description:
        "Uncovering insights through user interviews, usability testing, and competitive analysis to inform design decisions.",
      icon: "🔍",
      deliverables: [
        "User Interviews & Synthesis",
        "Usability Testing",
        "Competitive Analysis",
        "Heuristic Evaluation",
        "Survey Design & Analysis",
        "Research Reports",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Product Strategy",
      description: "Aligning user needs with business goals to create roadmaps that drive meaningful outcomes.",
      icon: "🧠",
      deliverables: [
        "User Personas & Journey Maps",
        "Product Roadmapping",
        "Feature Prioritization",
        "Workshops & Ideation Sessions",
        "Competitive Positioning",
        "Metrics Definition",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "UI Design",
      description:
        "Creating intuitive, accessible, and visually appealing interfaces that enhance the user experience.",
      icon: "✏️",
      deliverables: [
        "Wireframes & Prototypes",
        "Visual Design",
        "Design Systems",
        "Responsive Web Design",
        "Mobile App Design",
        "Accessibility Implementation",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Design Implementation",
      description: "Ensuring design integrity throughout the development process and beyond.",
      icon: "🛠️",
      deliverables: [
        "Developer Handoff",
        "Design QA",
        "Design Documentation",
        "Implementation Support",
        "Design System Maintenance",
        "Post-Launch Optimization",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          I offer comprehensive design services tailored to healthcare technology companies, focusing on creating
          experiences that improve lives and drive business growth.
        </p>
      </section>

      {/* Service Offerings */}
      <section className="mb-24">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="text-4xl mb-2">{service.icon}</div>
                <h2 className="text-3xl font-bold font-playfair">{service.title}</h2>
                <p className="text-lg text-muted-foreground">{service.description}</p>
                <div>
                  <h3 className="text-lg font-medium mb-4">Deliverables include:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((deliverable, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`relative aspect-video ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Overview */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">My Design Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A flexible, iterative approach that adapts to your project's unique needs while ensuring we never lose sight
            of user needs and business goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              phase: "Discover",
              description:
                "Understanding the problem space through research, stakeholder interviews, and competitive analysis.",
              steps: ["Stakeholder Interviews", "User Research", "Market Analysis", "Problem Definition"],
            },
            {
              phase: "Define",
              description: "Synthesizing research insights to define clear goals, user needs, and success metrics.",
              steps: ["User Personas", "Journey Mapping", "Requirements Definition", "Success Metrics"],
            },
            {
              phase: "Design",
              description: "Creating solutions through ideation, prototyping, and iterative design based on feedback.",
              steps: ["Ideation Workshops", "Wireframing", "Prototyping", "Visual Design"],
            },
            {
              phase: "Deliver",
              description: "Finalizing designs, supporting implementation, and measuring outcomes.",
              steps: ["Design Documentation", "Developer Handoff", "Implementation Support", "Outcome Measurement"],
            },
          ].map((phase, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
              <p className="text-muted-foreground mb-4">{phase.description}</p>
              <ul className="space-y-2">
                {phase.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2"></div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-12 text-center">Engagement Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Project-Based",
              description: "Ideal for defined projects with clear scope and deliverables.",
              features: [
                "Fixed timeline and budget",
                "Clearly defined deliverables",
                "Regular progress updates",
                "Post-project support",
              ],
              cta: "Perfect for product launches or redesigns",
            },
            {
              title: "Retainer",
              description: "Ongoing support for teams that need consistent design expertise.",
              features: [
                "Dedicated hours each month",
                "Priority availability",
                "Regular check-ins",
                "Flexible allocation of hours",
              ],
              cta: "Ideal for growing product teams",
              highlighted: true,
            },
            {
              title: "Consulting",
              description: "Strategic guidance for teams looking to improve their design process.",
              features: [
                "Design process evaluation",
                "Team workshops and training",
                "Design system consultation",
                "UX audit and recommendations",
              ],
              cta: "Great for enhancing existing teams",
            },
          ].map((model, index) => (
            <div
              key={index}
              className={`border rounded-lg p-8 flex flex-col ${model.highlighted ? "border-primary ring-1 ring-primary" : ""}`}
            >
              {model.highlighted && (
                <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
              <p className="text-muted-foreground mb-6">{model.description}</p>
              <ul className="space-y-3 mb-8">
                {model.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm italic mb-6">{model.cta}</p>
              <Button asChild className="mt-auto" variant={model.highlighted ? "default" : "outline"}>
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-3xl mx-auto bg-muted p-8 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">Ready to Elevate Your Healthcare Product?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Let's discuss how my design services can help you create meaningful experiences that improve lives and drive
          business growth.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
