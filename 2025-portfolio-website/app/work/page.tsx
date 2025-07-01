import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProjectCard from "@/components/project-card"
import { getAllProjects } from "@/lib/data"

export default async function WorkPage() {
  const projects = await getAllProjects()

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">My Work</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explore my portfolio of healthcare technology projects where human-centered design meets business objectives
          to create meaningful impact.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="text-center bg-muted p-8 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">Interested in working together?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new projects and design challenges in the healthcare technology space.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Let's Talk <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  )
}

