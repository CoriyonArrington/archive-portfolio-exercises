import { createServerClient } from "@/lib/supabase/server"

export default async function HomeProjectsDebugPage() {
  const supabase = await createServerClient()

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(3)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Home Projects Debug</h1>

      {error && (
        <div className="bg-red-100 p-4 rounded mb-6">
          <h2 className="text-xl font-bold text-red-800">Error</h2>
          <pre className="mt-2 text-red-700">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Featured Projects Data Structure</h2>
        <pre className="overflow-auto max-h-[500px] p-4 bg-white dark:bg-gray-900 rounded">
          {JSON.stringify(projects, null, 2)}
        </pre>
      </div>

      {projects &&
        projects.map((project) => (
          <div key={project.id} className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mb-2">Image field values:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>thumbnail_url: {project.thumbnail_url || "Not set"}</li>
              <li>thumbnailUrl: {project.thumbnailUrl || "Not set"}</li>
              <li>image: {project.image || "Not set"}</li>
              <li>image_url: {project.image_url || "Not set"}</li>
            </ul>

            {project.thumbnail_url && (
              <div className="mt-4">
                <p className="mb-2">Image preview (thumbnail_url):</p>
                <img
                  src={project.thumbnail_url || "/placeholder.svg"}
                  alt={`Thumbnail for ${project.title}`}
                  className="max-w-md h-auto border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
