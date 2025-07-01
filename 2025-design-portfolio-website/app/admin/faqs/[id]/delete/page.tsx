import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFAQById } from "@/lib/data/faqs"
import { DeleteFAQButton } from "@/components/admin/delete-faq-button"

export const metadata: Metadata = {
  title: "Delete FAQ",
  description: "Delete a frequently asked question",
}

export default async function DeleteFAQPage({ params }: { params: { id: string } }) {
  const faq = await getFAQById(params.id)

  if (!faq) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Delete FAQ</h1>
        <p className="text-muted-foreground">Are you sure you want to delete this FAQ?</p>
      </div>

      <div className="rounded-md border p-4">
        <h2 className="text-xl font-semibold">{faq.question}</h2>
        <p className="mt-2">{faq.answer}</p>
      </div>

      <DeleteFAQButton id={faq.id} />
    </div>
  )
}
