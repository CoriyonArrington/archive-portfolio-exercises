import { createServerClient } from "@/lib/supabase/server"

export default async function ProjectsDebugPage() {
  const supabase = await createServerClient()

  const { data: projects, error } = await supabase.from("projects").select("*").limit(3)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Projects Debug</h1>

      {error && (
        <div className="bg-red-100 p-4 rounded mb-6">
          <h2 className="text-xl font-bold text-red-800">Error</h2>
          <pre className="mt-2 text-red-700">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Project Data Structure</h2>
        <pre className="overflow-auto max-h-[500px] p-4 bg-white dark:bg-gray-900 rounded">
          {JSON.stringify(projects, null, 2)}
        </pre>
      </div>
    </div>
  )
}
