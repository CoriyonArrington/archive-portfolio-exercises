"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Service } from "@/types/services"
import { createServiceAction, updateServiceAction } from "@/app/actions/service-actions"

const serviceSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  icon: z.string().optional(),
  display_order: z.coerce.number().int().min(0),
  deliverables: z.string().optional(),
})

type ServiceFormValues = z.infer<typeof serviceSchema>

interface ServiceFormProps {
  service?: Service
  isEditing?: boolean
}

export function ServiceForm({ service, isEditing = false }: ServiceFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Convert deliverables array to string for the form
  const deliverablesString = service?.deliverables ? service.deliverables.join("\n") : ""

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: service?.title || "",
      description: service?.description || "",
      icon: service?.icon || "",
      display_order: service?.display_order || 0,
      deliverables: deliverablesString,
    },
  })

  async function handleSubmit(values: ServiceFormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("icon", values.icon || "")
      formData.append("display_order", values.display_order.toString())
      formData.append("deliverables", values.deliverables || "")

      if (isEditing && service) {
        await updateServiceAction(service.id, formData)
      } else {
        await createServiceAction(formData)
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {error && <div className="bg-red-50 p-4 rounded-md text-red-500 mb-4">{error}</div>}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UI/UX Design" {...field} />
              </FormControl>
              <FormDescription>The name of the service you offer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the service..." className="min-h-32" {...field} />
              </FormControl>
              <FormDescription>A detailed description of what this service includes.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., palette" {...field} />
              </FormControl>
              <FormDescription>A Lucide icon name to represent this service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormDescription>The order in which this service appears (lower numbers appear first).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliverables"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deliverables (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter each deliverable on a new line..." className="min-h-32" {...field} />
              </FormControl>
              <FormDescription>List the deliverables for this service, one per line.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
        </Button>
      </form>
    </Form>
  )
}

