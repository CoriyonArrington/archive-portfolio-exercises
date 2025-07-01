"use client"

import { useEffect, useState } from "react"
import { createClientSideClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/layout/admin-layout"
import Link from "next/link"

export default function AuthDebugPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClientSideClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setSession(data.session)
        setIsAuthenticated(!!data.session)

        if (data.session) {
          setUser(data.session.user)
        }
      } catch (err: any) {
        console.error("Auth error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const testRlsPolicy = async () => {
    try {
      setTestResult(null)
      const supabase = createClientSideClient()

      const { data, error } = await supabase
        .from("testimonials")
        .insert({
          quote: "Test quote for RLS policy check",
          author: "Test Author",
          title: "Test Title",
          company: "Test Company",
          display_order: 999,
        })
        .select()

      if (error) {
        throw error
      }

      setTestResult({
        success: true,
        message: "Successfully inserted test testimonial",
        data,
      })
    } catch (err: any) {
      console.error("Test error:", err)
      setTestResult({
        success: false,
        message: err.message,
      })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Authentication Debug</h1>

        {loading ? (
          <div className="animate-pulse">Loading authentication status...</div>
        ) : (
          <>
            <div className="p-4 rounded-md bg-gray-50">
              <h2 className="text-lg font-medium mb-2">Authentication Status</h2>
              {isAuthenticated === null ? (
                <div>Checking authentication...</div>
              ) : isAuthenticated ? (
                <div className="text-green-600 font-medium">Authenticated</div>
              ) : (
                <div className="text-red-600 font-medium">Not Authenticated</div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-md bg-red-50">
                <h2 className="text-lg font-medium mb-2 text-red-700">Error</h2>
                <div className="text-red-600">{error}</div>
              </div>
            )}

            {user && (
              <div className="p-4 rounded-md bg-gray-50">
                <h2 className="text-lg font-medium mb-2">User Details</h2>
                <pre className="bg-white p-4 rounded overflow-auto text-sm">{JSON.stringify(user, null, 2)}</pre>
              </div>
            )}

            {session && (
              <div className="p-4 rounded-md bg-gray-50">
                <h2 className="text-lg font-medium mb-2">Session Details</h2>
                <pre className="bg-white p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(
                    {
                      ...session,
                      access_token: session.access_token ? "[REDACTED]" : null,
                      refresh_token: session.refresh_token ? "[REDACTED]" : null,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            )}

            <div className="p-4 rounded-md bg-gray-50">
              <h2 className="text-lg font-medium mb-2">Test RLS Policy</h2>
              <button
                onClick={testRlsPolicy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!isAuthenticated}
              >
                Test Testimonial Insert
              </button>

              {!isAuthenticated && (
                <div className="mt-2 text-yellow-600">
                  You need to be authenticated to test the RLS policy.{" "}
                  <Link href="/admin/login" className="underline">
                    Login here
                  </Link>
                </div>
              )}

              {testResult && (
                <div className={`mt-4 p-4 rounded-md ${testResult.success ? "bg-green-50" : "bg-red-50"}`}>
                  <h3 className={`font-medium ${testResult.success ? "text-green-700" : "text-red-700"}`}>
                    {testResult.success ? "Success" : "Error"}
                  </h3>
                  <p className="mt-1">{testResult.message}</p>
                  {testResult.data && (
                    <pre className="mt-2 bg-white p-2 rounded overflow-auto text-sm">
                      {JSON.stringify(testResult.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
