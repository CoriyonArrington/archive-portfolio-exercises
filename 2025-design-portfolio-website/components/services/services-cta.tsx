/**
 * ServicesCTA Component
 *
 * This component displays a call-to-action section for the services page,
 * encouraging visitors to get in touch about their project.
 */
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { ArrowRight } from "lucide-react"

export default function ServicesCTA() {
  return (
    <section className="mb-24">
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl">
        <div className="py-16 px-8 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900 dark:text-primary-50">
              Ready to transform your healthcare product?
            </h2>
            <p className="text-lg md:text-xl text-primary-800/90 dark:text-primary-100/90 mb-8">
              Let's discuss how these solutions can address your specific challenges and help you create exceptional
              user experiences that drive results.
            </p>
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/contact" className="inline-flex items-center">
                Schedule a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
