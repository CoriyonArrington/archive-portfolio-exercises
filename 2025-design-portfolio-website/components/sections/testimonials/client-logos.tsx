/**
 * ClientLogos Component
 *
 * This component displays a grid of client logos to establish credibility.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling with aria-labelledby
 * - Proper image alt text
 */
import Image from "next/image"

export default function ClientLogos() {
  return (
    <section className="mb-24" aria-labelledby="client-logos-heading">
      <h2 id="client-logos-heading" className="text-2xl md:text-3xl font-bold font-playfair mb-12 text-center">
        Trusted By
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center justify-center p-4">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt={`Client logo ${index + 1}`}
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

