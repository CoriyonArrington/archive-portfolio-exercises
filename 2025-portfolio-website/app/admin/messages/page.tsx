import { createServerSupabaseClient } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { deleteMessage } from "./actions"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default async function MessagesPage() {
  const supabase = await createServerSupabaseClient()

  let messages: any[] = []
  let error = null

  try {
    const { data, error: fetchError } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (fetchError) {
      error = fetchError.message
    } else {
      messages = data || []
    }
  } catch (err: any) {
    error = err.message || "An error occurred while fetching messages"
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Contact form submissions from your portfolio</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.includes("does not exist")
              ? "The contact_submissions table does not exist yet. Please set up your database first."
              : error}
            <div className="mt-4">
              <Button asChild>
                <Link href="/admin/setup">Set Up Database</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6">
        {!error && messages.length > 0 ? (
          messages.map((message) => (
            <Card key={message.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{message.subject}</CardTitle>
                    <CardDescription className="mt-1">
                      From: {message.name} ({message.email})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{new Date(message.created_at).toLocaleDateString()}</Badge>
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={message.id} />
                      <Button variant="ghost" size="icon" type="submit" className="text-destructive h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground">{message.message}</p>
              </CardContent>
            </Card>
          ))
        ) : !error ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

