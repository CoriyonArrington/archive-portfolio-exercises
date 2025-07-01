import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { createServerClient } from "@/lib/supabase/server"
import { ProjectGrid } from '@/components/sections/work/project-grid'
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "Work | Coriyon's Portfolio",
  description: "Explore my recent design and development projects.",
}

export default async function WorkPage() {
  console.log("Fetching projects for work page...")

  try {
    // Use the async server client
    const supabase = await createServerClient()

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching projects:", error)
      return notFound()
    }

    return (
      <main className="container py-6 md:py-10 lg:py-16">
        <SectionHeading title="My Work" description="Explore my recent projects and case studies." />

        <ProjectGrid projects={projects} />
      </main>
    )
  } catch (error) {
    console.error("Error in WorkPage:", error)
    return notFound()
  }
}

