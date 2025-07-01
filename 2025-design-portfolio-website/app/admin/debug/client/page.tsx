"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import { getPublicEnvInfo } from "../server-env"

export default function ClientDebugPage() {
  const [status, setStatus] = useState("Not tested")
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [envInfo, setEnvInfo] = useState<any>(null)

  useEffect(() => {
    async function loadEnvInfo() {
      const info = await getPublicEnvInfo()
      setEnvInfo(info)
    }
    loadEnvInfo()
  }, [])

  const testConnection = async () => {
    try {
      setStatus("Testing...")
      setData(null)
      setError(null)

      const supabase = createBrowserSupabaseClient()

      const { data, error } = await supabase.from("projects").select("*").limit(5)

      if (error) {
        setStatus("Error")
        setError(error)
      } else {
        setStatus("Connected")
        setData(data)
      }
    } catch (e) {
      setStatus("Error")
      setError(e)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Client-Side Supabase Debug</h1>

      <div className="mb-6">
        <Button onClick={testConnection}>Test Client Connection</Button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <div className="p-4 bg-white rounded-lg shadow">
          <p>
            Status:{" "}
            <span className={status === "Connected" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {status}
            </span>
          </p>
          {error && (
            <div className="mt-2">
              <p className="text-red-600 font-medium">Error:</p>
              <pre className="bg-gray-100 p-3 rounded mt-1 text-sm overflow-auto max-h-40">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {envInfo && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
          <div className="p-4 bg-white rounded-lg shadow">
            <p>NEXT_PUBLIC_SUPABASE_URL: {envInfo.supabaseUrl}</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envInfo.hasSupabaseAnonKey ? "Set (hidden)" : "Not set"}</p>
            <p>NEXT_PUBLIC_SITE_URL: {envInfo.hasSiteUrl ? "Set (hidden)" : "Not set"}</p>
          </div>
        </div>
      )}

      {data && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Data Preview</h2>
          <div className="p-4 bg-white rounded-lg shadow overflow-auto">
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
