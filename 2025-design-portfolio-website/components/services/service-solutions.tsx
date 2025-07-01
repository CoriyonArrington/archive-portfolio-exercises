"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  LineChart,
  Layout,
  Users,
  Code,
  Lightbulb,
  Microscope,
  Presentation,
  FileText,
  PenTool,
  Layers,
  Workflow,
  Gauge,
  Sparkles,
  Palette,
  MonitorSmartphone,
  Stethoscope,
  Tablet,
  Smartphone,
  Brain,
  HeartPulse,
} from "lucide-react"

// Map of icon names to their components - MUST MATCH home/service-overview.tsx
const iconMap = {
  search: Search,
  code: Code,
  layout: Layout,
  users: Users,
  lineChart: LineChart,
  lightbulb: Lightbulb,
  microscope: Microscope,
  presentation: Presentation,
  fileText: FileText,
  penTool: PenTool,
  layers: Layers,
  workflow: Workflow,
  gauge: Gauge,
  sparkles: Sparkles,
  palette: Palette,
  monitorSmartphone: MonitorSmartphone,
  stethoscope: Stethoscope,
  tablet: Tablet,
  smartphone: Smartphone,
  brain: Brain,
  heartPulse: HeartPulse,
}

interface ServiceSolutionsProps {
  services: any[]
}

export default function ServiceSolutions({ services }: ServiceSolutionsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="pb-12 md:pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-0">
        <ServiceSolutionsContent services={services} isClient={isClient} />
      </div>
    </section>
  )
}

// Service icon component - MUST MATCH home/service-overview.tsx
function ServiceIcon({ service }: { service: any }) {
  // First check if the service has a specific iconName
  if (service.iconName && iconMap[service.iconName]) {
    const IconComponent = iconMap[service.iconName]
    return (
      <div className="bg-yellow-500 dark:bg-yellow-500/90 rounded-full p-3 inline-flex mb-4" aria-hidden="true">
        <IconComponent className="h-6 w-6 text-yellow-100" />
      </div>
    )
  }

  // If no specific icon is provided, fall back to keyword matching
  let icon

  // Convert title and description to lowercase for case-insensitive matching
  const title = service.title.toLowerCase()
  const description = service.description ? service.description.toLowerCase() : ""

  // Check for keywords in both title and description for more accurate matching
  if (title.includes("research") || description.includes("research") || title.includes("testing")) {
    icon = <Search className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("ui/ux") || title.includes("design system")) {
    icon = <Layers className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("interaction") || description.includes("interaction")) {
    icon = <PenTool className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("audit") || description.includes("audit") || title.includes("optimization")) {
    icon = <Gauge className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("mobile") || description.includes("mobile") || title.includes("app")) {
    icon = <Smartphone className="h-6 w-6 text-yellow-100" />
  } else {
    // Default fallback icon
    icon = <Lightbulb className="h-6 w-6 text-yellow-100" />
  }

  return (
    <div className="bg-yellow-500 dark:bg-yellow-500/90 rounded-full p-3 inline-flex mb-4" aria-hidden="true">
      {icon}
    </div>
  )
}

function ServiceSolutionsContent({ services, isClient }: { services: any[]; isClient: boolean }) {
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-card hover:shadow-md transition-all duration-300 dark:bg-black"
        >
          <ServiceIcon service={service} />
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

          <h4 className="text-sm font-medium mb-2">Key Deliverables:</h4>
          <ul className="space-y-1 mb-4">
            {service.deliverables &&
              service.deliverables.map((deliverable: string, i: number) => (
                <li key={i} className="flex items-start text-sm">
                  <Check
                    className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{deliverable}</span>
                </li>
              ))}
          </ul>

          {service.business_stat_value && service.business_stat_label && (
            <>
              <hr className="my-4 border-gray-200 dark:border-gray-800" />
              <div className="mt-2">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{service.business_stat_value}</p>
                <p className="text-muted-foreground text-sm">{service.business_stat_label}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
