"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function SupabaseDebugClient() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function testClientConnection() {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data, error } = await supabase.from("projects").select("*").limit(1)

      if (error) {
        setError(error)
      } else {
        setResult(data)
      }
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Client-Side Connection Test</h2>

      <Button onClick={testClientConnection} disabled={isLoading}>
        {isLoading ? "Testing..." : "Test Client Connection"}
      </Button>

      {result && (
        <div className="mt-4">
          <h3 className="font-medium text-green-600">Success!</h3>
          <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-auto max-h-40">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <h3 className="font-medium text-red-600">Error:</h3>
          <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-auto max-h-40">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
