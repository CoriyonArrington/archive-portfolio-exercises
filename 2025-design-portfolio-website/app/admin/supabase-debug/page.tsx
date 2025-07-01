"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@supabase/supabase-js"

export default function SupabaseDebugPage() {
  const [table, setTable] = useState("testimonials")
  const [limit, setLimit] = useState("5")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runQuery = async () => {
    try {
      setError(null)

      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      const { data, error } = await supabase.from(table).select("*").limit(Number.parseInt(limit))

      if (error) {
        throw error
      }

      setResult(data)
    } catch (err: any) {
      console.error("Supabase query error:", err)
      setError(err.message || "An error occurred")
      setResult(null)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Supabase Debug</h1>
      <p className="text-gray-500">Test Supabase queries and check table data.</p>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Table</label>
            <Select value={table} onValueChange={setTable}>
              <SelectTrigger>
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="testimonials">testimonials</SelectItem>
                <SelectItem value="projects">projects</SelectItem>
                <SelectItem value="services">services</SelectItem>
                <SelectItem value="faqs">faqs</SelectItem>
                <SelectItem value="process_steps">process_steps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Limit</label>
            <Input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} min="1" max="100" />
          </div>

          <Button onClick={runQuery}>Run Query</Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
