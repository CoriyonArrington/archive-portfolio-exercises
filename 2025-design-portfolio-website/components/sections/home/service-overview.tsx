"use client"

import { useState, useEffect } from "react"
import { getServicesClient } from "@/lib/supabase/client-utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  slug: string
}

export default function ServiceOverview() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const services = await getServicesClient()

        // Add a safety check
        if (services && Array.isArray(services)) {
          const featuredServices = services.slice(0, 3)
          setServices(featuredServices)
        } else {
          console.warn("Services data is not an array or is empty")
          setServices([])
        }
      } catch (error) {
        console.error("Error loading services:", error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return <div className="py-24 text-center">Loading services...</div>
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-24" aria-labelledby="services-heading">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Services
          </h2>
          <Button asChild variant="ghost">
            <Link href="/services">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group relative">
              <div className="bg-card rounded-lg p-6 h-full flex flex-col border border-border transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md">
                {service.icon && (
                  <div className="text-primary mb-4">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                <Button asChild variant="link" className="p-0 justify-start">
                  <Link href={`/services/${service.slug}`}>
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

