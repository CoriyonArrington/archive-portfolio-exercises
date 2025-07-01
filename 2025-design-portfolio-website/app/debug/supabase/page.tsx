import { createServerClient } from "@/lib/supabase/server"

export default async function SupabaseDebugPage() {
  const supabase = await createServerClient()

  // Test query for all testimonials
  const { data: allTestimonials, error: allError } = await supabase.from("testimonials").select("*")

  // Test query for featured testimonials
  const { data: featuredTestimonials, error: featuredError } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)

  // Get the table structure
  const { data: tableInfo, error: tableError } = await supabase.from("testimonials").select("*").limit(1)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Debug</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Table Structure</h2>
        {tableError ? (
          <div className="text-red-500">Error: {tableError.message}</div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(tableInfo ? Object.keys(tableInfo[0]) : {}, null, 2)}
          </pre>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">All Testimonials</h2>
        <p className="mb-2">Count: {allTestimonials?.length || 0}</p>
        {allError ? (
          <div className="text-red-500">Error: {allError.message}</div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(
              allTestimonials?.map((t) => ({
                id: t.id,
                author: t.author,
                featured: t.featured,
                image: t.image ? "Has image" : "No image",
              })),
              null,
              2,
            )}
          </pre>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Testimonials</h2>
        <p className="mb-2">Count: {featuredTestimonials?.length || 0}</p>
        {featuredError ? (
          <div className="text-red-500">Error: {featuredError.message}</div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(
              featuredTestimonials?.map((t) => ({
                id: t.id,
                author: t.author,
                featured: t.featured,
                image: t.image ? "Has image" : "No image",
              })),
              null,
              2,
            )}
          </pre>
        )}
      </div>
    </div>
  )
}
