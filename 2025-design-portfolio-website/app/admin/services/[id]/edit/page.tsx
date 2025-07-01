import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServiceById } from "@/lib/data/services"
import { ServiceForm } from "@/components/admin/service-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Edit Service",
  description: "Edit an existing design service",
}

export const dynamic = "force-dynamic"

interface EditServicePageProps {
  params: {
    id: string
  }
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  // Destructure and await params.id
  const { id } = params
  const service = await getServiceById(id)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
        <p className="text-muted-foreground">Update the details of an existing service.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>Edit the form below to update this service.</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceForm service={service} isEditing />
        </CardContent>
      </Card>
    </div>
  )
}
