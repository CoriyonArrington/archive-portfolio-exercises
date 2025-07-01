/**
 * Performance Improvements
 *
 * This provides recommendations for improving performance
 */

export const performanceImprovements = {
    serverComponents: {
      title: "Leverage React Server Components",
      description: "Move data fetching to server components where possible",
      benefits: [
        "Reduced client-side JavaScript",
        "Faster initial page load",
        "Better SEO",
        "Improved performance on low-end devices",
      ],
      implementation: `
  // BEFORE: Client component with data fetching
  "use client"
  import { useEffect, useState } from "react"
  
  export function ProjectList() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => {
          setProjects(data)
          setLoading(false)
        })
    }, [])
    
    if (loading) return <div>Loading...</div>
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }
  
  // AFTER: Server component with data fetching
  import { getProjects } from "@/lib/data/projects"
  import { ProjectGrid } from "@/components/sections/work/project-grid"
  
  export default async function ProjectsPage() {
    const projects = await getProjects()
    
    return <ProjectGrid projects={projects} />
  }
  `,
    },
    imageOptimization: {
      title: "Optimize Images",
      description: "Use Next.js Image component and proper image optimization",
      benefits: ["Faster page loads", "Reduced bandwidth usage", "Better Core Web Vitals", "Improved user experience"],
      implementation: `
  // BEFORE: Regular img tag
  <img src="/images/project.jpg" alt="Project" />
  
  // AFTER: Optimized Next.js Image component
  import Image from "next/image"
  
  <Image
    src="/images/project.jpg"
    alt="Project"
    width={800}
    height={600}
    priority={isHero}
    loading="lazy"
    className="rounded-lg"
  />
  `,
    },
    suspenseBoundaries: {
      title: "Strategic Suspense Boundaries",
      description: "Use Suspense to improve loading experience",
      benefits: [
        "Better perceived performance",
        "Progressive loading of content",
        "Reduced layout shift",
        "Improved user experience",
      ],
      implementation: `
  // BEFORE: Loading state in component
  export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)  {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      fetch('/api/projects')
        .then(res => res.json())
        .then(data => {
          setProjects(data)
          setLoading(false)
        })
    }, [])
    
    if (loading) return <div>Loading...</div>
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  }
  
  // AFTER: Using Suspense for loading states
  import { Suspense } from "react"
  import { ProjectList } from "@/components/sections/work/project-list"
  import { ProjectListSkeleton } from "@/components/sections/work/project-list-skeleton"
  
  export default function ProjectsPage() {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Our Projects</h1>
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList />
        </Suspense>
      </div>
    )
  }
  `,
    },
    routeSegmentation: {
      title: "Route Segmentation",
      description: "Use Next.js App Router route segmentation for better code splitting",
      benefits: [
        "Smaller JavaScript bundles",
        "Faster page loads",
        "Better performance on low-end devices",
        "Improved user experience",
      ],
      implementation: `
  // BEFORE: All routes in the same segment
  app/
    page.tsx
    about/page.tsx
    contact/page.tsx
    work/page.tsx
    admin/page.tsx
    admin/projects/page.tsx
    admin/testimonials/page.tsx
  
  // AFTER: Routes segmented by purpose
  app/
    (main)/
      page.tsx
      about/page.tsx
      contact/page.tsx
      work/page.tsx
    (admin)/
      page.tsx
      projects/page.tsx
      testimonials/page.tsx
  `,
    },
  }
  
  