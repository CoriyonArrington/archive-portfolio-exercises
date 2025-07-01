import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/auth"
import { FolderKanban, MessageSquareQuote, Briefcase, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  // Initialize counts with default values
  let projectCount = 0
  let testimonialCount = 0
  let serviceCount = 0
  let messageCount = 0
  let recentMessages: any[] = []

  try {
    // Fetch counts from each table
    const [projectResult, testimonialResult, serviceResult, messageResult] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    ])

    projectCount = projectResult.count || 0
    testimonialCount = testimonialResult.count || 0
    serviceCount = serviceResult.count || 0
    messageCount = messageResult.count || 0

    // Fetch recent messages
    const messagesResult = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    if (!messagesResult.error) {
      recentMessages = messagesResult.data
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your portfolio admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
            <p className="text-xs text-muted-foreground">Total projects in your portfolio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
            <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonialCount}</div>
            <p className="text-xs text-muted-foreground">Client testimonials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceCount}</div>
            <p className="text-xs text-muted-foreground">Service offerings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageCount}</div>
            <p className="text-xs text-muted-foreground">Contact form submissions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Latest inquiries from your contact form</CardDescription>
        </CardHeader>
        <CardContent>
          {recentMessages && recentMessages.length > 0 ? (
            <div className="space-y-6">
              {recentMessages.map((message) => (
                <div key={message.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm font-medium">{message.subject}</p>
                  <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No messages yet.</p>
              <p className="text-sm text-muted-foreground mb-4">
                You need to set up your database tables before you can see messages.
              </p>
              <Button asChild>
                <Link href="/admin/setup">Set Up Database</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

