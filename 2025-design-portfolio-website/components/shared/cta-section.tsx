import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

// Change from default export to named export
export function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: CTASectionProps) {
  return (
    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">{description}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg">
          <Link href={buttonLink} className="flex items-center">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {secondaryButtonText && secondaryButtonLink && (
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

// Add default export that re-exports the named export
// This maintains backward compatibility with existing imports
export default CTASection
