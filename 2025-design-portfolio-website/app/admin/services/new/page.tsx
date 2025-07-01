import type { Metadata } from "next"
import { ServiceForm } from "@/components/admin/service-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Add New Service",
  description: "Add a new design service to your portfolio",
}

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Service</h1>
        <p className="text-muted-foreground">Create a new service to showcase on your portfolio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>Fill out the form below to create a new service.</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceForm />
        </CardContent>
      </Card>
    </div>
  )
}
