"use client"

import { useState } from "react"
import { createClientSideClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/layout/admin-layout"

export default function CheckSchemaPage() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tables = ["projects", "testimonials", "services", "faqs", "process"]

  const checkSchema = async () => {
    try {
      setLoading(true)
      setError(null)
      setResults([])

      const supabase = createClientSideClient()
      const schemaResults = []

      for (const table of tables) {
        // Get table information
        const { data: tableInfo, error: tableError } = await supabase.from(table).select("*").limit(1)

        if (tableError) {
          schemaResults.push({
            table,
            exists: false,
            error: tableError.message,
            columns: [],
          })
          continue
        }

        // Get column information
        const { data: columnData, error: columnError } = await supabase.rpc("get_column_info", { table_name: table })

        if (columnError) {
          schemaResults.push({
            table,
            exists: true,
            error: columnError.message,
            columns: [],
          })
          continue
        }

        schemaResults.push({
          table,
          exists: true,
          error: null,
          columns: columnData || [],
          sample: tableInfo && tableInfo.length > 0 ? tableInfo[0] : null,
        })
      }

      setResults(schemaResults)
    } catch (err: any) {
      console.error("Schema check error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Schema Check</h1>

        <p className="text-gray-600">Check database schema and table structures.</p>

        <button
          onClick={checkSchema}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking Schema..." : "Check Schema"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 rounded-md">
            <h2 className="text-lg font-medium text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.table} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-lg font-medium mb-2">
                  Table: {result.table}
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      result.exists ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.exists ? "Exists" : "Missing"}
                  </span>
                </h2>

                {result.error && (
                  <div className="p-3 bg-red-50 rounded-md mb-4">
                    <p className="text-red-600 text-sm">{result.error}</p>
                  </div>
                )}

                {result.columns.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Column
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nullable
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {result.columns.map((column: any, index: number) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {column.column_name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{column.data_type}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {column.is_nullable ? "Yes" : "No"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {result.sample && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Sample Data</h3>
                    <pre className="bg-gray-50 p-3 rounded overflow-auto text-xs max-h-60">
                      {JSON.stringify(result.sample, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
