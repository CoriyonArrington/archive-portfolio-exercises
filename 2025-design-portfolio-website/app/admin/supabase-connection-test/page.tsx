"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { AdminLayout } from "@/components/admin/layout/admin-layout"

export default function SupabaseConnectionTest() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Create a client directly with the environment variables
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      // Test a simple query instead of using count() which causes errors
      const { data, error } = await supabase.from("projects").select("id").limit(1)

      if (error) {
        throw error
      }

      setResult({
        success: true,
        message: "Successfully connected to Supabase",
        data,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 5) + "...", // Only show part of the key for security
      })
    } catch (err: any) {
      setError(err.message || "An error occurred while testing the connection")
      console.error("Supabase connection test error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Supabase Connection Test</h1>

        <p className="text-gray-600">
          This tool tests a direct connection to your Supabase database using client-side code. It bypasses the
          server-side authentication to help diagnose connection issues.
        </p>

        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Connection"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            <h2 className="font-bold">Error</h2>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
            <h2 className="font-bold">{result.message}</h2>
            <div className="mt-2">
              <p>
                <strong>URL:</strong> {result.url}
              </p>
              <p>
                <strong>Key:</strong> {result.key}
              </p>
              <p>
                <strong>Data:</strong> {JSON.stringify(result.data)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h2 className="font-bold mb-2">Environment Variables</h2>
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}
          </p>
          <p>
            <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set"}
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
