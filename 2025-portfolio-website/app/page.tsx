import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a conditional Supabase client
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export default async function HomePage() {
  // If Supabase client is not available, use fallback data
  let featuredProjects = []
  let testimonials = []

  if (supabase) {
    // Fetch data from Supabase if client is available
    const projectsPromise = supabase.from("projects").select("*").limit(3)

    const testimonialsPromise = supabase.from("testimonials").select("*").limit(3)

    const [projectsResult, testimonialsResult] = await Promise.all([projectsPromise, testimonialsPromise])

    if (!projectsResult.error && projectsResult.data) {
      featuredProjects = projectsResult.data
    }

    if (!testimonialsResult.error && testimonialsResult.data) {
      testimonials = testimonialsResult.data
    }
  } else {
    // Fallback data when Supabase is not configured
    featuredProjects = [
      {
        id: 1,
        title: "HealthTrack Mobile App",
        description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
        image: "/placeholder.svg?height=600&width=800",
        slug: "health-track-app",
      },
      {
        id: 2,
        title: "MedConnect Platform",
        description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
        image: "/placeholder.svg?height=600&width=800",
        slug: "med-connect-platform",
      },
      {
        id: 3,
        title: "Financial Dashboard",
        description: "Interactive dashboard for visualizing and analyzing financial data.",
        image: "/placeholder.svg?height=600&width=800",
        slug: "financial-dashboard",
      },
    ]

    testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Product Manager at HealthTech",
        content:
          "Working with this team was a game-changer for our product. Their attention to detail and user-centered approach transformed our application.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "CTO at TeleMed Solutions",
        content:
          "The design work exceeded our expectations. Our users love the intuitive interface, and we've seen significant improvements in engagement metrics.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "Director of Digital at FinTech Inc",
        content:
          "Their strategic approach to UX design helped us solve complex problems in a way that feels simple and elegant to our users.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ]
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6">
              Crafting digital experiences that connect and convert
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              I'm a product designer specializing in creating intuitive digital experiences that solve real problems and
              delight users.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/work">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-playfair mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/work">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-playfair mb-12 text-center">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-6">Ready to start your project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's collaborate to create meaningful digital experiences that resonate with your users.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
