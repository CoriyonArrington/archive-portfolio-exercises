import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  buttonText?: string
  buttonLink: string
  className?: string
  variant?: "default" | "subtle" | "outline"
}

export function CTASection({
  title,
  description,
  buttonText = "Get started today",
  buttonLink,
  className,
  variant = "default",
}: CTASectionProps) {
  const variantStyles = {
    default: "bg-primary-50 dark:bg-primary-900/40",
    subtle: "bg-muted/50",
    outline: "border border-border bg-background",
  }

  const titleStyles = {
    default: "text-primary-900 dark:text-primary-50",
    subtle: "text-foreground",
    outline: "text-foreground",
  }

  const descriptionStyles = {
    default: "text-primary-800/90 dark:text-primary-100/90",
    subtle: "text-muted-foreground",
    outline: "text-muted-foreground",
  }

  return (
    <section className={cn("mb-12", className)}>
      <div className={cn("rounded-lg", variantStyles[variant])}>
        <div className="py-12 px-4 md:py-16 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={cn("text-3xl md:text-4xl font-bold mb-6", titleStyles[variant])}>{title}</h2>
            <p className={cn("text-lg md:text-xl mb-8", descriptionStyles[variant])}>{description}</p>
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href={buttonLink || "#"}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}