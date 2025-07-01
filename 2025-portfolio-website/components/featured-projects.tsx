import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProjects } from "@/lib/data"

export default async function FeaturedProjects() {
  // Get featured projects (will always return data, either from DB or mock)
  const featuredProjects = await getFeaturedProjects()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project) => (
        <div key={project.id} className="group border rounded-lg overflow-hidden flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.images[0] || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild variant="ghost" className="justify-start p-0 hover:bg-transparent">
              <Link href={`/work/${project.slug}`} className="flex items-center text-primary">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

