import type { Metadata } from "next"
import { FAQForm } from "@/components/admin/faq-form"

export const metadata: Metadata = {
  title: "Add New FAQ",
  description: "Add a new frequently asked question",
}

export default function NewFAQPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New FAQ</h1>
        <p className="text-muted-foreground">Create a new frequently asked question for your services page.</p>
      </div>

      <FAQForm />
    </div>
  )
}
