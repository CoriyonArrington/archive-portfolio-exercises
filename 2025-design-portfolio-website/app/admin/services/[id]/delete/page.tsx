import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getServiceById } from "@/lib/data/services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteServiceButton } from "@/components/admin/delete-service-button"

export const metadata: Metadata = {
  title: "Delete Service",
  description: "Delete an existing design service",
}

export const dynamic = "force-dynamic"

interface DeleteServicePageProps {
  params: {
    id: string
  }
}

export default async function DeleteServicePage({ params }: DeleteServicePageProps) {
  // Destructure and await params.id
  const { id } = params
  const service = await getServiceById(id)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Delete Service</h1>
        <p className="text-muted-foreground">Are you sure you want to delete this service?</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Confirm Deletion</CardTitle>
          <CardDescription>This action cannot be undone. This will permanently delete the service.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Service Title</h3>
              <p>{service.title}</p>
            </div>
            <div>
              <h3 className="font-medium">Description</h3>
              <p>{service.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/services">
            <Button variant="outline">Cancel</Button>
          </Link>
          <DeleteServiceButton id={service.id} />
        </CardFooter>
      </Card>
    </div>
  )
}
