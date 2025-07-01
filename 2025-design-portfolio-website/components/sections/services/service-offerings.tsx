"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getServices, fallbackServices } from "@/lib/services"
import type { Service } from "@/types/service"

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl p-6 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center mb-4">
        <div className="size-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4">
          <span className="text-amber-600 dark:text-amber-400 text-xl">{service.icon || "🔍"}</span>
        </div>
        <h3 className="text-xl font-bold">{service.title}</h3>
      </div>

      <p className="text-muted-foreground mb-6">{service.description}</p>

      <div className="mb-4">
        <h4 className="font-bold mb-3">Key Deliverables:</h4>
        <ul className="space-y-2">
          {service.deliverables?.map((deliverable, i) => (
            <li key={i} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{deliverable}</span>
            </li>
          ))}
        </ul>
      </div>

      {service.business_stat && service.business_stat_label && (
        <>
          <hr className="my-4 border-gray-200 dark:border-gray-800" />
          <div className="mt-4">
            <p className="text-3xl font-bold text-amber-500">{service.business_stat}</p>
            <p className="text-muted-foreground">{service.business_stat_label}</p>
          </div>
        </>
      )}

      <Button variant="ghost" className="group mt-4" asChild>
        <a href="/contact" className="inline-flex items-center">
          Request this service
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    </motion.div>
  )
}

function ServiceCardSkeleton() {
  return (
    <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center mb-4">
        <Skeleton className="size-12 rounded-full mr-4" />
        <Skeleton className="h-7 w-40" />
      </div>

      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />

      <div className="mb-6">
        <Skeleton className="h-6 w-32 mb-3" />
        <div className="space-y-2">
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="flex items-start">
            <Skeleton className="h-5 w-5 mr-2 mt-0.5" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>

      <Skeleton className="h-10 w-40 mt-2" />
    </div>
  )
}

export default function ServiceOfferings() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        setIsLoading(true)
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error("Error loading services:", error)
        setServices(fallbackServices)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => <ServiceCardSkeleton key={i} />)
            : services.map((service, i) => <ServiceCard key={service.id} service={service} index={i} />)}
        </div>
      </div>
    </section>
  )
}

