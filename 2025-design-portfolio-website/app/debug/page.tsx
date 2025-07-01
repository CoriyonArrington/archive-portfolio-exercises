"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Copy, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

// Define types for our state
interface EnvVars {
  url: string | null
  hasAnonKey: boolean
}

interface RawResponse {
  projects?: {
    data: unknown
    error: unknown
  }
  testimonials?: {
    data: unknown
    error: unknown
  }
  [key: string]: unknown
}

// Define types for our data
interface ProjectData {
  id: string
  title: string
  slug: string
  tags: string[] | string
  [key: string]: unknown
}

interface TestimonialData {
  id: string
  author: string
  title: string
  quote: string
  [key: string]: unknown
}

export default function DebugPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<EnvVars>({ url: null, hasAnonKey: false })
  const [tables, setTables] = useState<string[]>([])
  const [projectsData, setProjectsData] = useState<ProjectData[] | null>(null)
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[] | null>(null)
  const [projectsError, setProjectsError] = useState<string | null>(null)
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null)
  const [rawResponse, setRawResponse] = useState<RawResponse | null>(null)

  async function runDiagnostics() {
    try {
      setLoading(true)
      setError(null)
      setProjectsError(null)
      setTestimonialsError(null)
      setRawResponse(null)

      // Check environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      setEnvVars({
        url: url || null,
        hasAnonKey,
      })

      if (!url || !hasAnonKey) {
        throw new Error("Missing Supabase environment variables")
      }

      // Try to fetch projects
      try {
        const { data: projects, error: projectsErr } = await supabase.from("projects").select("*").limit(5)

        if (projectsErr) {
          setProjectsError(projectsErr.message)
          console.error("Projects error:", projectsErr)
        } else {
          setProjectsData(projects as ProjectData[])
        }

        // Store raw response for debugging
        setRawResponse((prev: RawResponse | null) => ({
          ...(prev || {}),
          projects: { data: projects, error: projectsErr },
        }))
      } catch (error: unknown) {
        const errorObj = error as Error
        setProjectsError(errorObj.message)
      }

      // Try to fetch testimonials
      try {
        const { data: testimonials, error: testimonialsErr } = await supabase.from("testimonials").select("*").limit(5)

        if (testimonialsErr) {
          setTestimonialsError(testimonialsErr.message)
          console.error("Testimonials error:", testimonialsErr)
        } else {
          setTestimonialsData(testimonials as TestimonialData[])
        }

        // Store raw response for debugging
        setRawResponse((prev: RawResponse | null) => ({
          ...(prev || {}),
          testimonials: { data: testimonials, error: testimonialsErr },
        }))
      } catch (error: unknown) {
        const errorObj = error as Error
        setTestimonialsError(errorObj.message)
      }

      // Try to get list of tables
      try {
        const { data: tablesData, error: tablesErr } = await supabase
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public")

        if (!tablesErr && tablesData) {
          setTables(tablesData.map((t: { table_name: string }) => t.table_name))
        } else {
          console.warn("Could not fetch tables list:", tablesErr)
        }
      } catch (error: unknown) {
        const errorObj = error as Error
        console.warn("Error fetching tables:", errorObj)
      }
    } catch (error: unknown) {
      const errorObj = error as Error
      setError(errorObj.message)
      console.error("Diagnostics error:", errorObj)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Supabase Data Debugging</h1>
        <Button onClick={runDiagnostics} disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Diagnostics
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Check if your Supabase environment variables are properly set</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">NEXT_PUBLIC_SUPABASE_URL</p>
                  <p className="text-sm text-muted-foreground">
                    {envVars.url ? envVars.url.substring(0, 20) + "..." : "Not set"}
                  </p>
                </div>
                <Badge
                  variant={envVars.url ? "default" : "destructive"}
                  className={envVars.url ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
                >
                  {envVars.url ? "Set" : "Missing"}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
                  <p className="text-sm text-muted-foreground">
                    {envVars.hasAnonKey ? "••••••••••••••••••••" : "Not set"}
                  </p>
                </div>
                <Badge
                  variant={envVars.hasAnonKey ? "default" : "destructive"}
                  className={
                    envVars.hasAnonKey ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""
                  }
                >
                  {envVars.hasAnonKey ? "Set" : "Missing"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Overall Supabase connection status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-muted animate-pulse"></div>
                <p>Testing connection...</p>
              </div>
            ) : error ? (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>Connection error: {error}</p>
              </div>
            ) : projectsError && testimonialsError ? (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>Connection issues detected with both tables</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <p>Connected to Supabase</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tables */}
        <Card>
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>Tables found in your Supabase database</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-6 bg-muted rounded animate-pulse"></div>
              </div>
            ) : tables.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tables.map((table) => (
                  <Badge key={table} variant="outline">
                    {table}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tables found or unable to retrieve table list.</p>
            )}
          </CardContent>
        </Card>

        {/* Data Preview */}
        <Tabs defaultValue="projects">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="raw">Raw Response</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects Data</CardTitle>
                <CardDescription>Preview of data from the projects table</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : projectsError ? (
                  <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md">
                    <p className="text-destructive font-medium">Error fetching projects:</p>
                    <p className="text-destructive/80">{projectsError}</p>
                  </div>
                ) : projectsData && projectsData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">ID</th>
                          <th className="text-left p-2">Title</th>
                          <th className="text-left p-2">Slug</th>
                          <th className="text-left p-2">Tags</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsData.map((project) => (
                          <tr key={project.id} className="border-b">
                            <td className="p-2">{project.id}</td>
                            <td className="p-2">{project.title}</td>
                            <td className="p-2">{project.slug}</td>
                            <td className="p-2">
                              {Array.isArray(project.tags) ? project.tags.join(", ") : String(project.tags || "")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No projects found in the database.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Data</CardTitle>
                <CardDescription>Preview of data from the testimonials table</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                  </div>
                ) : testimonialsError ? (
                  <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md">
                    <p className="text-destructive font-medium">Error fetching testimonials:</p>
                    <p className="text-destructive/80">{testimonialsError}</p>
                  </div>
                ) : testimonialsData && testimonialsData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">ID</th>
                          <th className="text-left p-2">Author</th>
                          <th className="text-left p-2">Title</th>
                          <th className="text-left p-2">Quote</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testimonialsData.map((testimonial) => (
                          <tr key={testimonial.id} className="border-b">
                            <td className="p-2">{testimonial.id}</td>
                            <td className="p-2">{testimonial.author}</td>
                            <td className="p-2">{testimonial.title}</td>
                            <td className="p-2">{testimonial.quote?.substring(0, 50) || ""}...</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No testimonials found in the database.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raw">
            <Card>
              <CardHeader>
                <CardTitle>Raw Response</CardTitle>
                <CardDescription>Raw JSON response from Supabase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(rawResponse, null, 2))
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto max-h-[400px] text-xs">
                    {JSON.stringify(rawResponse, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        {/* Troubleshooting Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Tips</CardTitle>
            <CardDescription>Common issues and solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">1. Environment Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure your environment variables are correctly set in your deployment platform. For Vercel, check
                  the Environment Variables section in your project settings.
                </p>
              </div>

              <div>
                <h3 className="font-medium">2. Table Structure</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your Supabase database has the required tables (projects, testimonials) with the correct
                  schema. Create them if they don't exist.
                </p>
              </div>

              <div>
                <h3 className="font-medium">3. Row-Level Security (RLS) Policies</h3>
                <p className="text-sm text-muted-foreground">
                  Check if your tables have RLS enabled but no policies that allow the anon key to read data. You might
                  need to add a policy like:
                </p>
                <pre className="bg-muted p-2 rounded-md text-xs mt-2">
                  CREATE POLICY "Allow anonymous read access" ON "public"."projects" FOR SELECT USING (true);
                </pre>
              </div>

              <div>
                <h3 className="font-medium">4. Data Existence</h3>
                <p className="text-sm text-muted-foreground">
                  Verify that you have actually inserted data into your tables. If the tables are empty, your queries
                  will return empty arrays.
                </p>
              </div>

              <div>
                <h3 className="font-medium">5. CORS Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Check your Supabase project's API settings to ensure your deployment URL is in the allowed origins for
                  CORS.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
