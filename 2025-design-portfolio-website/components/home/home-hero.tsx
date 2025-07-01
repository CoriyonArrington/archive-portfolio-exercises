"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ActiveVisitors } from "@/components/active-visitors"
import { ArrowRight } from "lucide-react"
import HeroShowcaseWrapper from "./hero-showcase-wrapper"
import TestimonialAvatars from "./testimonial-avatars"
import { Suspense } from "react"

export default function HomeHero() {
  return (
    <section className="flex flex-col items-center text-center py-16 md:py-24">
      <div className="relative inline-flex flex-col items-center mb-6">
        <ActiveVisitors className="mb-3" />
        <span className="text-sm font-medium tracking-wider uppercase">UX Design Studio for Small Businesses</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Good design solves business problems.
        <br />
        Let's start with yours.
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
        From early-stage startups to neighborhood businesses and enterprise teams—I help people simplify digital
        experiences so their products are easier to use, easier to love, and better for business.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
          <Link href="/contact" className="flex items-center">
            Book a free 20-minute consult <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <TestimonialAvatars />
      </Suspense>
      <div className="relative w-full max-w-4xl">
        <HeroShowcaseWrapper />
      </div>
    </section>
  )
}
