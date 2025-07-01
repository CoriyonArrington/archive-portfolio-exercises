/**
 * EngagementModels Component
 *
 * This component displays the designer's engagement models:
 * project-based, retainer, and consulting.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper list markup
 * - Decorative icons marked as aria-hidden
 * - Proper link text
 */
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function EngagementModels() {
  // Engagement models data
  const models = [
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
  ]

  return (
    <section className="mb-24" aria-labelledby="engagement-models-heading">
      <h2 id="engagement-models-heading" className="text-3xl md:text-4xl font-bold font-playfair mb-12">
        Engagement models
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {models.map((model, index) => (
          <div
            key={index}
            className={`border rounded-lg p-8 flex flex-col ${model.highlighted ? "border-primary ring-1 ring-primary" : ""}`}
          >
            {model.highlighted && (
              <div
                className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full self-start mb-4"
                aria-label="Most Popular option"
              >
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
            <p className="text-muted-foreground mb-6">{model.description}</p>

            <div className="mb-6">
              <h4 className="font-medium mb-2">What's included:</h4>
              <ul className="space-y-3">
                {model.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Benefits section removed as requested */}

            <p className="text-sm italic mb-6">{model.cta}</p>
            <Button asChild className="mt-auto" variant={model.highlighted ? "default" : "outline"}>
              <Link href="/contact" aria-label={`Get started with ${model.title} engagement model`}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
