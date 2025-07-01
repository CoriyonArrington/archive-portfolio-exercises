"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceSolutionsProps {
  services: any[]
}

export default function ServiceSolutions({ services }: ServiceSolutionsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Service Solutions</h2>
        <ServiceSolutionsContent services={services} isClient={isClient} />
      </div>
    </section>
  )
}

function ServiceSolutionsContent({ services, isClient }: { services: any[]; isClient: boolean }) {
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!services || services.length === 0) {
    return <div className="text-center py-12">No services found</div>
  }

  console.log("Service data:", services[0]) // Debug service structure

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-yellow-400 dark:hover:border-yellow-600"
        >
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400">
              {service.title.charAt(0)}
            </div>
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

          {/* Deliverables */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Deliverables</h4>
              <ul className="space-y-2">
                {service.deliverables.map((deliverable: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Divider */}
          <div className="border-t my-4"></div>

          {/* Business Stats */}
          {service.business_stat_value && service.business_stat_label && (
            <div className="mb-4">
              <div className="text-2xl font-bold text-yellow-500">{service.business_stat_value}</div>
              <div className="text-xs text-muted-foreground">{service.business_stat_label}</div>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-auto pt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/contact">Request this service</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

