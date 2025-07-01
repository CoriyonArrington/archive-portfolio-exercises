"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Puzzle,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Users,
  Microscope,
  BarChart3,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/shared/section-heading"
import { CTASection } from "@/components/shared/cta-section"

export default function AboutPageClient() {
  // Navigation sections - wrap in useMemo to prevent recreation on each render
  const sections = useMemo(
    () => [
      { id: "value", label: "Client Value" },
      { id: "approach", label: "My Approach" },
      { id: "experience", label: "Work Experience" },
      { id: "education", label: "Education" },
    ],
    [],
  )

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
  }, [sections]) // Now sections won't change between renders

  // Work experience timeline data
  const timelineItems = [
    {
      year: "2024 - Present",
      role: "Senior Product Designer",
      company: "CareHive Health",
      description:
        "Lead designer for digital health products focused on chronic disease management. Collaborate with cross-functional teams to deliver user-centered solutions that improve patient outcomes and clinical workflows.",
      achievements: [
        "Led the redesign of flagship patient monitoring app, resulting in 40% increase in daily active users",
        "Established the company's first design system, improving design consistency and development efficiency by 30%",
        "Mentored junior designers and established user research practices that reduced development rework by 25%",
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//bju33h2432_1741740888680.png",
    },
    {
      year: "2022 - 2023",
      role: "Product Designer",
      company: "Manifold Group",
      description:
        "Designed interfaces for medical devices and companion applications, focusing on usability and safety for both clinical and home use contexts.",
      achievements: [
        "Redesigned critical alarm interfaces, reducing error rates by 35% and improving patient safety",
        "Conducted extensive field research with patients and healthcare providers that informed product roadmap",
        "Collaborated with regulatory affairs to ensure designs met FDA requirements, accelerating approval process",
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/7z507tsdelk_1741745764952.JPG",
    },
    {
      year: "2021 - 2022",
      role: "Associate Product Designer",
      company: "Manifold Group",
      description: "Assisted in the design and testing of digital health interventions for underserved populations.",
      achievements: [
        "Contributed to the design of a multilingual health education platform that increased user comprehension by 45%",
        "Conducted usability testing with diverse user groups that identified critical accessibility improvements",
        "Presented research findings to stakeholders that influenced $2M in product development decisions",
      ],
      image: "https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images//k66iffy638j_1741745267676.JPG",
    },
  ]

  return (
    <div className="w-full">
      <div className="grid gap-12 lg:grid-cols-[3fr_1fr] lg:grid-rows-[auto_1fr]">
        {/* Sidebar Navigation - Above content on mobile, right side on desktop */}
        <div className="lg:col-start-2 lg:row-span-full">
          <div className="rounded-lg border p-6 lg:sticky lg:top-20 mb-8 lg:mb-0">
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
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://drive.google.com/file/d/1iH2sulJLbcbR7Z1g9FJwBPUyLczjiqn8/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-16 lg:col-start-1 lg:row-start-1">
          {/* Client Value Section - New section focused on client benefits */}
          <section id="value" className="scroll-mt-24">
            <SectionHeading title="How I help clients succeed" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <Puzzle className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Bridging Technical & User Needs</h3>
                <p className="text-muted-foreground">
                  My biomedical engineering background allows me to understand complex healthcare systems while
                  translating them into intuitive user experiences. This means your products will be both technically
                  sound and user-friendly.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <TrendingUp className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Driving Measurable Results</h3>
                <p className="text-muted-foreground">
                  I focus on outcomes that matter to your business: increased user engagement, reduced support costs,
                  and improved patient outcomes. My designs have helped clients achieve up to 40% increases in user
                  retention.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <DollarSign className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Reducing Development Costs</h3>
                <p className="text-muted-foreground">
                  Through thorough research and testing, I help clients avoid costly rework and development detours. My
                  process typically reduces development iterations by 30%, saving both time and budget.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <ShieldCheck className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Regulatory Compliance</h3>
                <p className="text-muted-foreground">
                  I understand healthcare regulatory requirements and design with compliance in mind, helping your
                  products navigate FDA and other regulatory approvals more smoothly.
                </p>
              </div>
            </div>
          </section>

          {/* My Approach Section - Moved above Work Experience */}
          <section id="approach" className="scroll-mt-24">
            <SectionHeading title="My approach to client projects" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <Users className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Collaborative Partnership</h3>
                <p className="text-muted-foreground">
                  I work as an extension of your team, ensuring clear communication and alignment throughout the project
                  lifecycle.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Regular check-ins and progress updates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Transparent decision-making process</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <Microscope className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Evidence-Based Design</h3>
                <p className="text-muted-foreground">
                  Every design decision is backed by research, testing, and data to ensure we're solving the right
                  problems in the right way.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>User research and usability testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Data-driven design iterations</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <div className="bg-green-500 dark:bg-green-500/90 rounded-full p-3 inline-flex mb-2">
                    <BarChart3 className="h-6 w-6 text-green-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Business-Focused Outcomes</h3>
                <p className="text-muted-foreground">
                  I focus on designs that not only delight users but also drive your business metrics and support your
                  strategic goals.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>KPI-driven design solutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>ROI measurement and reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section id="experience" className="scroll-mt-24">
            <SectionHeading title="Work experience" />

            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-green-200 dark:bg-green-800/50" />

              <div className="space-y-24">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot with number */}
                    <div className="absolute left-0 top-0">
                      <div className="z-20 size-12 rounded-full bg-green-500 dark:bg-green-500/90 flex items-center justify-center text-white text-base font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="ml-16 grid auto-cols-fr grid-cols-1 gap-8 md:gap-12">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                          <h3 className="text-2xl font-bold">{item.role}</h3>
                          <span className="hidden md:inline text-muted-foreground">•</span>
                          <span className="text-green-600 dark:text-green-400 font-medium">{item.company}</span>
                        </div>
                        <p className="text-lg font-medium text-muted-foreground mb-3">{item.year}</p>

                        <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
                          <div>
                            <p className="text-muted-foreground max-w-2xl mb-6">{item.description}</p>

                            <div className="mt-4">
                              <h4 className="font-medium mb-3">Key achievements:</h4>
                              <ul className="space-y-2 list-none pl-0">
                                {item.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start">
                                    <div className="text-green-600 dark:text-green-400 mr-2 mt-1">
                                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                                    </div>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Project image */}
                          <div className="relative overflow-hidden rounded-lg border border-muted shadow-sm">
                            <div className="aspect-[4/3] w-full relative">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={`Project at ${item.company}`}
                                fill
                                className="object-cover object-[center_25%]"
                                sizes="(max-width: 768px) 100vw, 300px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="scroll-mt-24">
            <SectionHeading title="Education" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Certificate of Product Design</h3>
                <p className="text-primary mb-1">Thinkful</p>
                <p className="text-muted-foreground mb-4">2019 - 2020</p>
                <p>Specialized in healthcare UX design with a focus on accessibility and inclusive design practices.</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">B.S. in Biomedical Engineering</h3>
                <p className="text-primary mb-1">East Carolina University</p>
                <p className="text-muted-foreground mb-4">2010 - 2015</p>
                <p>Focused on medical device design and human factors engineering.</p>
              </div>
            </div>
          </section>

          {/* CTA Section - Updated to match Process page */}
          <CTASection />
        </div>
      </div>
    </div>
  )
}
