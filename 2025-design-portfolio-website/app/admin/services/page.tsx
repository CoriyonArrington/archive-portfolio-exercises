import type { Metadata } from "next"
import Link from "next/link"
import { getServices } from "@/lib/data/services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import ServicesList from "@/components/admin/services-list"

export const metadata: Metadata = {
  title: "Services Management",
  description: "Manage your design services",
}

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your design services that appear on the services page.</p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>
            A list of all services in your portfolio. You can add, edit, or delete services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServicesList services={services} />
        </CardContent>
      </Card>
    </div>
  )
}
