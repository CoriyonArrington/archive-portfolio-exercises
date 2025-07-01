import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFAQById } from "@/lib/data/faqs"
import { FAQForm } from "@/components/admin/faq-form"

export const metadata: Metadata = {
  title: "Edit FAQ",
  description: "Edit a frequently asked question",
}

export default async function EditFAQPage({ params }: { params: { id: string } }) {
  // Ensure params.id is a string and not a Promise
  const id = params.id
  const faq = await getFAQById(id)

  if (!faq) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
        <p className="text-muted-foreground">Update an existing frequently asked question.</p>
      </div>

      <FAQForm faq={faq} mode="edit" />
    </div>
  )
}
