import Link from "next/link"
import { Suspense } from "react"
import TestimonialAvatars from "./testimonial-avatars"
import HeroShowcaseWrapper from "./hero-showcase-wrapper"
import { ActiveVisitors } from "@/components/shared/active-visitors"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Separate the main hero content that should render immediately
function HeroContent() {
  return (
    <>
      <div className="relative inline-flex flex-col items-center mb-6">
        <ActiveVisitors className="mb-3" />
        <span className="text-sm font-medium tracking-wider uppercase">Your Design Partner</span>
      </div>
      {/* Add id to the h1 to identify it as the LCP element and preload it */}
      <h1 className="heading-xl max-w-4xl mb-6" id="main-heading">
        Helping healthcare companies create <span className="text-primary italic">human-centered</span> products.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        I partner with healthcare startups and enterprises to design intuitive digital products that improve patient
        outcomes and drive business growth.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button asChild size="lg">
          <Link href="/contact" className="flex items-center">
            Let's work together <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/work">View client work</Link>
        </Button>
      </div>
    </>
  )
}

// Main component that doesn't await data
export default function HomeHero() {
  return (
    <section className="flex flex-col items-center text-center py-16 md:py-24">
      {/* Critical content that should render immediately */}
      <HeroContent />

      {/* Non-critical content that can load later */}
      <Suspense fallback={<TrustIndicatorsSkeleton />}>
        <TestimonialAvatars />
      </Suspense>

      {/* Hero showcase with client-side rendering - now using the wrapper */}
      <div className="relative w-full max-w-4xl">
        {/* The showcase itself */}
        <HeroShowcaseWrapper />

        {/* Blur gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none"
          style={{ zIndex: 20 }}
        />

        {/* See more button - needs pointer-events-auto to be clickable */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center" style={{ zIndex: 25 }}>
          <Button asChild variant="secondary" size="lg" className="shadow-lg">
            <Link href="/work/increasing-patient-engagement">
              See full case study <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Simple skeleton for trust indicators
function TrustIndicatorsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 mb-12 animate-pulse">
      <div className="flex -space-x-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border border-gray-100"></div>
        ))}
      </div>
      <div className="h-5 w-40 bg-gray-200 rounded"></div>
    </div>
  )
}

