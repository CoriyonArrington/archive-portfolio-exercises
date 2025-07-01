import { Suspense } from "react"
import { getFAQs } from "@/lib/data/faqs"
import { FAQsList } from "@/components/admin/faqs-list"

export const dynamic = "force-dynamic"

export default async function FAQsPage() {
  const faqs = await getFAQs()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
          <p className="text-muted-foreground">
            Manage your frequently asked questions that appear on the services page.
          </p>
        </div>
      </div>

      <Suspense fallback={<div>Loading FAQs...</div>}>
        <FAQsList faqs={faqs} />
      </Suspense>
    </div>
  )
}
