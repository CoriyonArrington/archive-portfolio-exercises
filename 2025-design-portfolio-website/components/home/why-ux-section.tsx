import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function WhyUXSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Confusing UX drives users away—even when your product works.</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Most people don't leave because your product lacks features. They leave because it feels clunky, unclear, or
          just too hard to use. We focus on designing experiences that feel effortless, familiar, and human—so users
          stay longer and come back often. I’ve worked with local shops, mission-driven founders, and enterprise teams
          to improve UX with empathy and clarity.
        </p>
        <Button asChild className="mt-8">
          <Link href="/services">See how we can help</Link>
        </Button>
      </div>
    </section>
  )
}
