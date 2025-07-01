import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface RelatedProjectsProps {
  currentProjectId: string
}

export default function RelatedProjects({ currentProjectId }: RelatedProjectsProps) {
  // Mock data - would come from Supabase in production
  const relatedProjects = [
    {
      id: "health-track-app",
      title: "HealthTrack Mobile App",
      description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
      image: "/placeholder.svg?height=600&width=800",
      slug: "health-track-app",
    },
    {
      id: "med-connect-platform",
      title: "MedConnect Platform",
      description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
      image: "/placeholder.svg?height=600&width=800",
      slug: "med-connect-platform",
    },
    {
      id: "bio-wearable-dashboard",
      title: "BioWearable Dashboard",
      description: "Analytics dashboard for healthcare professionals to monitor patient data from wearable devices.",
      image: "/placeholder.svg?height=600&width=800",
      slug: "bio-wearable-dashboard",
    },
  ]
    .filter((project) => project.id !== currentProjectId)
    .slice(0, 2)

  if (relatedProjects.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {relatedProjects.map((project) => (
          <div key={project.id} className="group border rounded-lg overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <Button asChild variant="outline">
                <Link href={`/work/${project.slug}`}>
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
