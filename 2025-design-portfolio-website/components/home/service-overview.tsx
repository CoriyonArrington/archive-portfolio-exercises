/**
 * ServiceOverview Component
 *
 * This component displays a curated selection of the designer's services on the home page.
 * Each service is presented with an icon, title, description, and key deliverables.
 */
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllServices } from "@/lib/services"
import type { ServiceType } from "@/types/service"
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

// Map of icon names to their components - MUST MATCH service-solutions.tsx
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

// Loading skeleton for service overview
function ServiceOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="border rounded-lg p-6 bg-card">
          <Skeleton className="h-12 w-12 rounded-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-4" />

          <Skeleton className="h-5 w-1/3 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Service icon component - MUST MATCH service-solutions.tsx
function ServiceIcon({ service }: { service: ServiceType }) {
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
  if (title.includes("workshop") || description.includes("workshop") || description.includes("facilitation")) {
    icon = <Users className="h-6 w-6 text-yellow-100" />
  } else if (
    title.includes("implementation") ||
    description.includes("implement") ||
    description.includes("integration")
  ) {
    icon = <Code className="h-6 w-6 text-yellow-100" />
  } else if (
    title.includes("research") ||
    description.includes("research") ||
    description.includes("discovery") ||
    description.includes("analysis")
  ) {
    icon = <Search className="h-6 w-6 text-yellow-100" />
  } else if (
    title.includes("strategy") ||
    description.includes("strategy") ||
    description.includes("roadmap") ||
    description.includes("planning")
  ) {
    icon = <LineChart className="h-6 w-6 text-yellow-100" />
  } else if (
    title.includes("design") ||
    title.includes("ui") ||
    title.includes("ux") ||
    description.includes("design") ||
    description.includes("interface") ||
    description.includes("experience") ||
    title.includes("redesign") ||
    description.includes("redesign")
  ) {
    icon = <Layout className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("workflow") || description.includes("workflow") || description.includes("optimization")) {
    icon = <Sparkles className="h-6 w-6 text-yellow-100" />
  } else if (
    title.includes("telehealth") ||
    description.includes("telehealth") ||
    description.includes("virtual care")
  ) {
    icon = <MonitorSmartphone className="h-6 w-6 text-yellow-100" />
  } else if (title.includes("medical device") || description.includes("medical device")) {
    icon = <Stethoscope className="h-6 w-6 text-yellow-100" />
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

// Service overview content component that fetches data
async function ServiceOverviewContent() {
  try {
    // Get all services from Supabase
    const services = await getAllServices()

    // Show all services, up to 6
    const displayedServices = services.slice(0, 6)

    // If we don't have a workshop service, add one
    const hasWorkshop = displayedServices.some(
      (service) =>
        service.title.toLowerCase().includes("workshop") ||
        (service.description && service.description.toLowerCase().includes("workshop")),
    )

    if (!hasWorkshop && displayedServices.length < 6) {
      // Add a workshop service
      displayedServices.push({
        id: "workshop-service",
        title: "UX/UI Design Workshops",
        description:
          "Collaborative sessions to align stakeholders, generate ideas, and solve complex design challenges",
        iconName: "users",
        deliverables: [
          "Stakeholder alignment sessions",
          "Design thinking workshops",
          "User journey mapping",
          "Rapid prototyping sessions",
        ],
        businessStatValue: "87%",
        businessStatLabel: "of workshop participants report clearer product vision",
      })
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-6 bg-card hover:shadow-md transition-all duration-300 dark:bg-black"
          >
            <ServiceIcon service={service} />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

            <h4 className="text-sm font-medium mb-2">Key Deliverables:</h4>
            <ul className="space-y-1 mb-4">
              {service.deliverables.slice(0, 3).map((deliverable, i) => (
                <li key={i} className="flex items-start text-sm">
                  <Check
                    className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>

            {service.businessStatValue && service.businessStatLabel && (
              <>
                <hr className="my-4 border-gray-200 dark:border-gray-800" />
                <div className="mt-2">
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{service.businessStatValue}</p>
                  <p className="text-muted-foreground text-sm">{service.businessStatLabel}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching services:", error)
    return (
      <div className="p-8 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Unable to load services</h2>
        <p>We're experiencing technical difficulties. Please try again later.</p>
      </div>
    )
  }
}

// Main component with suspense boundary
export default function ServiceOverview() {
  return (
    <div className="mx-auto">
      <Suspense fallback={<ServiceOverviewSkeleton />}>
        <ServiceOverviewContent />
      </Suspense>
      <div className="flex justify-center mt-8">
        <Button asChild variant="ghost" className="group">
          <Link href="/services" className="flex items-center">
            See all services
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
