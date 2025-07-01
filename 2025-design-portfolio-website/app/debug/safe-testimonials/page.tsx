import { createServerClient } from "@/lib/supabase/server"

export default async function SafeTestimonialsDebugPage() {
  // Get raw testimonials data directly from Supabase
  let testimonials = []
  let error = null

  try {
    const supabase = await createServerClient()
    const { data, fetchError } = await supabase.from("testimonials").select("*")

    if (fetchError) {
      error = fetchError.message
    } else {
      testimonials = data || []
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Testimonials Debug (Safe Version)</h1>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Server-Side Data</h2>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <p>Total testimonials: {testimonials.length}</p>
            <p>Featured testimonials: {testimonials.filter((t: any) => t.featured).length}</p>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Featured Testimonials:</h3>
              <ul className="space-y-4">
                {testimonials
                  .filter((t: any) => t.featured)
                  .map((item: any, index: number) => (
                    <li key={index} className="border p-3 rounded bg-white">
                      <p>
                        <strong>ID:</strong> {item.id}
                      </p>
                      <p>
                        <strong>Author:</strong> {item.author}
                      </p>
                      <p>
                        <strong>Featured:</strong> {String(item.featured)}
                      </p>
                      <p>
                        <strong>Avatar URL:</strong> {item.avatar_url || "No image"}
                      </p>
                      <p>
                        <strong>Image:</strong> {item.image || "No image"}
                      </p>
                      {(item.image || item.avatar_url) && (
                        <div className="mt-2">
                          <p>Image preview:</p>
                          <div
                            className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden"
                            style={{
                              backgroundImage: `url('/placeholder.svg?height=64&width=64')`,
                              backgroundSize: "cover",
                            }}
                          >
                            {/* No client-side image with onError handler */}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
