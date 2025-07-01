"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkSupabaseConnection } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// Define a more specific type for the status state
interface ConnectionStatus {
  connected: boolean
  error?: string
  data?: unknown // Changed from Record<string, unknown> to unknown
  loading: boolean
}

export default function SupabaseTestPage() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    loading: true,
  })

  async function testConnection() {
    setStatus((prev) => ({ ...prev, loading: true }))

    try {
      // Test 1: Check environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        setStatus({
          connected: false,
          error: "Missing environment variables",
          loading: false,
        })
        return
      }

      // Test 2: Try a simple query
      const result = await checkSupabaseConnection()

      setStatus({
        connected: result.connected,
        error: result.connected ? undefined : result.error,
        data: result.connected ? result.data : undefined,
        loading: false,
      })
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err))
      setStatus({
        connected: false,
        error: error.message || "Unknown error occurred",
        loading: false,
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          {status.loading ? (
            <p>Testing connection...</p>
          ) : status.connected ? (
            <div className="text-green-500">✅ Connected to Supabase successfully!</div>
          ) : (
            <div className="text-red-500">❌ Connection failed: {status.error}</div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                <span className="text-green-500">Set ✓</span>
              ) : (
                <span className="text-red-500">Missing ✗</span>
              )}
            </div>
            <div>
              <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                <span className="text-green-500">Set ✓</span>
              ) : (
                <span className="text-red-500">Missing ✗</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={testConnection} disabled={status.loading}>
        {status.loading ? "Testing..." : "Test Connection Again"}
      </Button>
    </div>
  )
}
