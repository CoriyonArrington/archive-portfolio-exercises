import { createServerClient } from "@/lib/supabase/server"
import Image from "next/image"

export default async function ImageDebugAlternativePage() {
  const supabase = await createServerClient()

  const { data: projects, error } = await supabase.from("projects").select("*").limit(5)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Image Debug (Alternative)</h1>

      {projects.map((project) => (
        <div key={project.id} className="mb-12 p-6 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Image URL:</h3>
            <code className="block p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto">
              {project.thumbnail_url || "No thumbnail_url"}
            </code>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
            <div className="relative h-64 w-full border rounded overflow-hidden">
              {project.thumbnail_url ? (
                <div className="relative w-full h-full">
                  {/* Using static Image without event handlers */}
                  <Image
                    src={project.thumbnail_url || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-contain"
                    unoptimized // Skip optimization to avoid potential issues
                  />
                  {/* Fallback shown if image fails to load via CSS */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 opacity-0 [&:has(+img:not([src]))]:[opacity:1]">
                    Fallback Image
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700">
                  No image available
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.categories) &&
                project.categories.map((category, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {category}
                  </span>
                ))}
              {!Array.isArray(project.categories) && (
                <span className="text-red-500">Categories not available or not an array</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
