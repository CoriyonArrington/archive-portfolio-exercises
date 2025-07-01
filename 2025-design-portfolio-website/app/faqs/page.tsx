import { Suspense } from "react"
import { getAllFAQs } from "@/lib/faqs"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our services, process, and more.",
}

function FAQSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="p-6 border rounded-lg">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  )
}

async function FAQsByCategory({ category }: { category: string }) {
  const allFaqs = await getAllFAQs()
  const filteredFaqs = category === "all" ? allFaqs : allFaqs.filter((faq) => faq.category === category)

  if (filteredFaqs.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No FAQs found for this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredFaqs.map((faq) => (
        <div key={faq.id} className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
          <p className="text-muted-foreground">{faq.answer}</p>
          {faq.category && <div className="mt-4 text-sm text-muted-foreground">Category: {faq.category}</div>}
        </div>
      ))}
    </div>
  )
}

async function FAQCategories() {
  const allFaqs = await getAllFAQs()

  // Extract unique categories
  const categories = ["all", ...new Set(allFaqs.map((faq) => faq.category).filter(Boolean))]

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8 flex flex-wrap justify-center">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category === "all" ? "All FAQs" : category}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <Suspense fallback={<FAQSkeleton />}>
            <FAQsByCategory category={category} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default function FAQsPage() {
  return (
    <main className="container px-0 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about our services, process, and working together.
        </p>
      </div>

      <Suspense fallback={<FAQSkeleton />}>
        <FAQCategories />
      </Suspense>
    </main>
  )
}
