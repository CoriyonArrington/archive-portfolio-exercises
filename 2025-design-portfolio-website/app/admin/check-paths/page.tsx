"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout/admin-layout"

export default function CheckPathsPage() {
  const [paths, setPaths] = useState<Array<{ path: string; status: string; error?: string }>>([])
  const [loading, setLoading] = useState(false)

  // Define paths to check
  const pathsToCheck = [
    "/admin",
    "/admin/dashboard",
    "/admin/projects",
    "/admin/testimonials",
    "/admin/services",
    "/admin/faqs",
    "/admin/process",
    "/admin/images",
    "/admin/auth-debug",
    "/admin/api-debug",
    "/admin/supabase-debug",
    "/admin/check-schema",
  ]

  const checkPath = async (path: string) => {
    try {
      const response = await fetch(path)
      return {
        path,
        status: response.ok ? "OK" : `Error: ${response.status}`,
        statusCode: response.status,
      }
    } catch (err: any) {
      return {
        path,
        status: "Error",
        error: err.message,
      }
    }
  }

  const checkAllPaths = async () => {
    setLoading(true)
    setPaths([])

    const results = []

    for (const path of pathsToCheck) {
      const result = await checkPath(path)
      results.push(result)
      setPaths([...results]) // Update state incrementally
    }

    setLoading(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Path Check</h1>

        <p className="text-gray-600">Check if routes are accessible and returning the expected status codes.</p>

        <button
          onClick={checkAllPaths}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking Paths..." : "Check All Paths"}
        </button>

        {paths.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paths.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.path}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          result.status === "OK" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.status}
                      </span>
                      {result.error && <p className="mt-1 text-xs text-red-600">{result.error}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
