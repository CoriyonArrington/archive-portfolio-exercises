export default function TestImages() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      <p className="mb-4">This page tests different image sources to see which ones work:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Imgur Image</h2>
          <img
            src="https://i.imgur.com/ZS8QEPw.jpg"
            alt="Imgur test image"
            width="400"
            height="300"
            className="rounded-md border border-gray-200"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Unsplash Image</h2>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
            alt="Unsplash test image"
            width="400"
            height="300"
            className="rounded-md border border-gray-200"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Placeholder Image</h2>
          <img
            src="https://placehold.co/400x300/4ade80/ffffff?text=Test+Image"
            alt="Placeholder test image"
            width="400"
            height="300"
            className="rounded-md border border-gray-200"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Supabase Image (Original)</h2>
          <img
            src="https://cezymahmqxazoloshntq.supabase.co/storage/v1/object/public/images/bju33h2432_1741740888680.png"
            alt="Supabase test image"
            width="400"
            height="300"
            className="rounded-md border border-gray-200"
          />
        </div>
      </div>
    </div>
  )
}
