"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import Timeline from "@/components/timeline"

export default function AboutPageClient() {
  // Navigation sections
  const sections = [
    { id: "about", label: "About Me" },
    { id: "story", label: "My Story" },
    { id: "experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "beyond", label: "Beyond Design" },
  ]

  const [activeSection, setActiveSection] = useState<string>(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [sections])

  // Work experience timeline data
  const timelineItems = [
    {
      year: "2021 - Present",
      role: "Senior Product Designer",
      company: "HealthTech Innovations",
      description:
        "Lead designer for digital health products focused on chronic disease management. Collaborate with cross-functional teams to deliver user-centered solutions that improve patient outcomes and clinical workflows.",
      achievements: [
        "Led the redesign of flagship patient monitoring app, resulting in 40% increase in daily active users",
        "Established the company's first design system, improving design consistency and development efficiency",
        "Mentored junior designers and established user research practices",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2019 - 2021",
      role: "UX Designer",
      company: "MedSolutions Inc.",
      description:
        "Designed interfaces for medical devices and companion applications, focusing on usability and safety for both clinical and home use contexts.",
      achievements: [
        "Redesigned critical alarm interfaces, reducing error rates by 35%",
        "Conducted extensive field research with patients and healthcare providers",
        "Collaborated with regulatory affairs to ensure designs met FDA requirements",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2018 - 2019",
      role: "Product Design Intern",
      company: "Healthcare Innovations Lab",
      description: "Assisted in the design and testing of digital health interventions for underserved populations.",
      achievements: [
        "Contributed to the design of a multilingual health education platform",
        "Conducted usability testing with diverse user groups",
        "Presented research findings to stakeholders and community partners",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[3fr_1fr]">
        {/* Main Content */}
        <div className="space-y-16">
          {/* Hero Section */}
          <section id="about" className="scroll-mt-24">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">About Me</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2 space-y-6">
                <p className="text-xl text-muted-foreground">
                  Senior Product Designer with a unique background in biomedical engineering and a passion for creating
                  healthcare solutions that improve lives.
                </p>
              </div>
              <div className="relative aspect-square w-full mx-auto md:mx-0">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Designer portrait"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </section>

          {/* My Story */}
          <section id="story" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-8">My Story</h2>
            <div className="space-y-6 text-lg">
              <p>
                My journey into product design began with a foundation in biomedical engineering, where I developed a
                deep understanding of how technology can address healthcare challenges. This unique perspective has
                shaped my approach to design, allowing me to bridge the gap between technical feasibility and human
                needs.
              </p>
              <p>
                Over the past five years, I've collaborated with healthcare startups and established medical technology
                companies to create digital products that not only solve complex problems but do so in ways that are
                intuitive and accessible to all users.
              </p>
              <p>
                What drives me is the opportunity to make a tangible difference in people's lives. Whether designing a
                patient portal that reduces anxiety or a clinical dashboard that helps healthcare providers make better
                decisions, I'm passionate about creating solutions that contribute to better health outcomes.
              </p>
              <p>
                My design philosophy centers on empathy, evidence, and impact. I believe in deeply understanding user
                needs, making design decisions based on research, and measuring success through meaningful outcomes for
                both users and businesses.
              </p>
            </div>
          </section>

          {/* Work Experience */}
          <section id="experience" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-12">Work Experience</h2>
            <Timeline items={timelineItems} />
          </section>

          {/* Education Section */}
          <section id="education" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-8">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Master of Human-Computer Interaction</h3>
                <p className="text-primary mb-1">Carnegie Mellon University</p>
                <p className="text-muted-foreground mb-4">2016 - 2018</p>
                <p>Specialized in healthcare UX design with a focus on accessibility and inclusive design practices.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">B.S. in Biomedical Engineering</h3>
                <p className="text-primary mb-1">Johns Hopkins University</p>
                <p className="text-muted-foreground mb-4">2012 - 2016</p>
                <p>
                  Focused on medical device design and human factors engineering. Minor in Human-Centered Computing.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Interests */}
          <section id="beyond" className="scroll-mt-24 bg-muted p-8 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-8">Beyond Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Health Advocacy",
                  description:
                    "I volunteer with local health literacy programs to help make medical information more accessible to underserved communities.",
                },
                {
                  title: "Outdoor Enthusiast",
                  description:
                    "When I'm not designing, you'll find me hiking or rock climbing—activities that help me maintain perspective and creative energy.",
                },
                {
                  title: "Continuous Learning",
                  description:
                    "I'm currently exploring the intersection of AI and healthcare design, taking courses in machine learning to better understand future opportunities.",
                },
              ].map((interest, index) => (
                <div key={index} className="p-6 bg-background rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                  <p>{interest.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
              Let's Create Something Meaningful Together
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              I'm always interested in connecting with healthcare innovators who are passionate about improving lives
              through thoughtful design.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>

        {/* Sidebar Navigation - Now on the right */}
        <div>
          <div className="rounded-lg border p-6 sticky top-20">
            <h3 className="text-lg font-medium mb-4">About Navigation</h3>

            <div className="space-y-6">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }}
                    className={cn(
                      "block py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                      activeSection === section.id ? "bg-muted text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {section.label}
                  </Link>
                ))}
              </nav>

              <Separator />

              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="/contact">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Contact Me
                  </Link>
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
