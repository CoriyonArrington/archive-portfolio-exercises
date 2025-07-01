"use client"

import { useEffect, useState } from "react"

export default function FeaturedDebug() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/testimonials/featured")

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err: any) {
        console.error("Error fetching featured testimonials:", err)
        setError(err.message || "Failed to fetch data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Testimonials Debug</h1>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}

      {data && (
        <div>
          <h2 className="text-xl font-semibold mb-2">API Response:</h2>
          <p className="mb-2">Count: {Array.isArray(data) ? data.length : "N/A"}</p>

          <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>

          {Array.isArray(data) && data.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Featured Testimonials:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item: any) => (
                  <div key={item.id} className="border p-4 rounded-md">
                    <p className="font-bold">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="mt-2 italic">"{item.quote}"</p>
                    <p className="mt-2">
                      <span className="font-semibold">Image:</span> {item.image || "None"}
                    </p>
                    <p>
                      <span className="font-semibold">Featured:</span> {item.featured ? "Yes" : "No"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
