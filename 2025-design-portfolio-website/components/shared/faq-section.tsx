import { Suspense } from "react"
import { getAllFAQs, getFAQsByCategory } from "@/lib/faqs"
import { Skeleton } from "@/components/ui/skeleton"

function FAQSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-6 border rounded-lg">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  )
}

interface FAQContentProps {
  category?: string
}

async function FAQContent({ category }: FAQContentProps) {
  // Fetch FAQs based on category or get all FAQs if no category is specified
  const faqs = category ? await getFAQsByCategory(category) : await getAllFAQs()

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No FAQs found for this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {faqs.map((faq) => (
        <div key={faq.id} className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
          <p className="text-muted-foreground">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

interface FAQSectionProps {
  title?: string
  description?: string
  category?: string
}

export default function FAQSection({ title = "Frequently asked questions", description, category }: FAQSectionProps) {
  return (
    <section className="pb-12 md:pb-16" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-0">
        <div className="mb-10">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
        </div>
        <Suspense fallback={<FAQSkeleton />}>
          <FAQContent category={category} />
        </Suspense>
      </div>
    </section>
  )
}
