import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ProjectNav from "@/components/project-nav"

// In a real app, this would fetch from Supabase
async function getProject(slug: string) {
  // Mock project data
  const projects = {
    "health-track-app": {
      id: "1",
      title: "HealthTrack Mobile App",
      client: "HealthTech Innovations",
      year: "2023",
      role: "Lead Product Designer",
      duration: "6 months",
      description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
      challenge:
        "Patients with chronic conditions often struggle to consistently track their health metrics and adhere to medication schedules, leading to poor health outcomes and increased healthcare costs.",
      solution:
        "Designed an intuitive mobile application that simplifies health tracking through personalized dashboards, medication reminders, and visual progress reports, making daily health management effortless for users.",
      process: [
        {
          phase: "Research",
          description:
            "Conducted interviews with 25 patients and 10 healthcare providers to understand pain points in health tracking and medication adherence.",
        },
        {
          phase: "Ideation",
          description:
            "Developed user personas and journey maps to identify key opportunities for improving the health tracking experience.",
        },
        {
          phase: "Design",
          description:
            "Created wireframes and high-fidelity prototypes, iterating based on user feedback from usability testing sessions.",
        },
        {
          phase: "Implementation",
          description: "Collaborated with developers to ensure design integrity throughout the development process.",
        },
      ],
      outcomes: [
        "92% of users reported improved medication adherence",
        "87% user satisfaction rate in post-launch surveys",
        "45% reduction in missed appointments",
        "Featured in Digital Health Today as an innovative solution",
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["UX Research", "UI Design", "Mobile App"],
      tools: ["Figma", "Miro", "UserTesting", "Hotjar"],
      categories: ["Healthcare", "Mobile", "UX/UI"],
    },
    "med-connect-platform": {
      id: "2",
      title: "MedConnect Platform",
      client: "TeleMed Solutions",
      year: "2022",
      role: "Senior UX Designer",
      duration: "8 months",
      description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
      challenge:
        "The COVID-19 pandemic accelerated the need for effective telemedicine solutions, but existing platforms were often confusing for older patients and inefficient for healthcare providers.",
      solution:
        "Designed an accessible telemedicine platform with simplified scheduling, intuitive video interfaces, and seamless integration with electronic health records to enhance the virtual care experience.",
      process: [
        {
          phase: "Research",
          description:
            "Analyzed competitor platforms and conducted remote usability studies with diverse user groups to identify accessibility barriers.",
        },
        {
          phase: "Ideation",
          description:
            "Facilitated remote design workshops with stakeholders to align on priorities and develop solution concepts.",
        },
        {
          phase: "Design",
          description:
            "Created an accessible design system and developed prototypes for both patient and provider interfaces.",
        },
        {
          phase: "Testing",
          description:
            "Conducted extensive usability testing with older adults and healthcare providers to refine the experience.",
        },
      ],
      outcomes: [
        "Platform adopted by 15 healthcare organizations",
        "98% completion rate for first-time appointments",
        "35% increase in provider efficiency",
        "Accessibility score of 98/100",
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["Service Design", "UI/UX", "Web Application"],
      tools: ["Figma", "Adobe XD", "Maze", "Lookback"],
      categories: ["Healthcare", "Telemedicine", "Accessibility"],
    },
    // Additional projects would be defined here
  }

  const project = projects[slug as keyof typeof projects]

  if (!project) {
    return null
  }

  return project
}

// Define the correct params type for this specific dynamic route
type Params = {
  slug: string
}

// Define the correct props type for the page component
type Props = {
  params: Params
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      {/* Back button and download case study */}
      <div className="flex justify-between items-center mb-12">
        <Button asChild variant="ghost">
          <Link href="/work">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download Case Study
        </Button>
      </div>

      {/* Project header */}
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <section className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">{project.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">CLIENT</h3>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">YEAR</h3>
                <p className="font-medium">{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ROLE</h3>
                <p className="font-medium">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">DURATION</h3>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
          </section>

          {/* Hero image */}
          <section className="mb-16">
            <div className="relative aspect-video w-full">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={`${project.title} hero image`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </section>

          {/* Challenge and Solution */}
          <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">The Challenge</h2>
              <p className="text-lg">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-4">The Solution</h2>
              <p className="text-lg">{project.solution}</p>
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.process.map((step, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.phase}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional images */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Design Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} design highlight ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Outcomes - Keeping this section as requested */}
          <section className="mb-16 bg-muted p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Outcomes & Impact</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-lg">{outcome}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar with project details */}
        <div>
          <div className="rounded-lg border p-6 sticky top-20">
            <h3 className="text-lg font-medium mb-4">Project Details</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="#" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </Link>
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Case Study PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next/Previous project navigation */}
      <ProjectNav currentProjectId={project.id} />
    </div>
  )
}
