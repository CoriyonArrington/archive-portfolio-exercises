"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiDebugPage() {
  const [id, setId] = useState("")
  const [apiUrl, setApiUrl] = useState("/api/projects")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleTest() {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      // Construct the URL with the ID if provided
      const url = id ? `${apiUrl}/${id}` : apiUrl

      // Make the API request
      const response = await fetch(url)

      // Get the response status and content type
      const status = response.status
      const contentType = response.headers.get("content-type") || ""

      // Try to parse the response as JSON
      let data = null
      let text = null

      if (contentType.includes("application/json")) {
        data = await response.json()
      } else {
        text = await response.text()
      }

      setResult({
        status,
        contentType,
        data,
        text,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">API Debug Tool</h1>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">API URL</Label>
              <Input
                id="apiUrl"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="Enter API URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="id">ID (optional)</Label>
              <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter ID (optional)" />
            </div>
          </div>

          <Button onClick={handleTest} disabled={loading}>
            {loading ? "Testing..." : "Test API"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-4">
            <Alert variant={result.status === 200 ? "default" : result.status === 404 ? "destructive" : "warning"}>
              <AlertTitle>Status: {result.status}</AlertTitle>
              <AlertDescription>Content-Type: {result.contentType}</AlertDescription>
            </Alert>

            {result.status === 404 && (
              <Alert variant="destructive">
                <AlertTitle>404 Not Found</AlertTitle>
                <AlertDescription>
                  <p>This could be due to:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Incorrect file naming in the API route</li>
                    <li>Missing API route file</li>
                    <li>The ID doesn't exist in the database</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {result.contentType.includes("text/html") && (
              <Alert variant="warning">
                <AlertTitle>HTML Response</AlertTitle>
                <AlertDescription>
                  The API returned HTML instead of JSON, which usually indicates an error page.
                </AlertDescription>
              </Alert>
            )}

            {result.data && (
              <div className="rounded-md border p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Data:</h3>
                <pre className="text-sm overflow-auto p-2 bg-white rounded border">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}

            {result.text && !result.data && (
              <div className="rounded-md border p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Response Text:</h3>
                <div className="text-sm overflow-auto p-2 bg-white rounded border max-h-96">
                  {result.text.length > 1000 ? result.text.substring(0, 1000) + "... (truncated)" : result.text}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
