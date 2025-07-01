"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/layout/admin-layout"
import { createClientSideClient } from "@/lib/supabase/client"

export default function ProjectsDebugPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<string>("")

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const supabase = createClientSideClient()

        // Fetch projects directly from Supabase
        const { data, error } = await supabase.from("projects").select("*")

        if (error) {
          throw error
        }

        setProjects(data || [])
        setRawData(JSON.stringify(data, null, 2))
      } catch (err: any) {
        console.error("Error fetching projects:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Projects Debug</h1>

        {error && (
          <div className="bg-red-50 p-4 rounded-md text-red-500">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium mb-2">Projects Count: {projects.length}</h2>
              <p>This page shows the raw data from Supabase to help debug issues.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium">Projects Raw Data</h2>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
                {rawData}
              </pre>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium">Projects Table</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scheduled
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Display Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thumbnail
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.featured ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.scheduled ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.display_order}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.thumbnail_url ? (
                            <img
                              src={project.thumbnail_url || "/placeholder.svg"}
                              alt={project.title}
                              className="h-10 w-10 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                              }}
                            />
                          ) : (
                            "No thumbnail"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
