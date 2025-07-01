"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const setupDatabase = async () => {
    setLoading(true)
    setError(null)

    try {
      // SQL to create the necessary tables
      const sql = `
      -- Create extension for UUID generation if it doesn't exist
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      -- Projects table
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        client TEXT NOT NULL,
        year TEXT NOT NULL,
        role TEXT NOT NULL,
        duration TEXT NOT NULL,
        challenge TEXT NOT NULL,
        solution TEXT NOT NULL,
        outcomes JSONB NOT NULL,
        process JSONB NOT NULL,
        images JSONB NOT NULL,
        tags JSONB NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Testimonials table
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        quote TEXT NOT NULL,
        author TEXT NOT NULL,
        title TEXT NOT NULL,
        image TEXT,
        project TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Services table
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        deliverables JSONB NOT NULL,
        image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Contact form submissions
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create Row Level Security (RLS) policies
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
      ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
      ALTER TABLE services ENABLE ROW LEVEL SECURITY;
      ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

      -- Create policies for public read access
      CREATE POLICY IF NOT EXISTS "Allow public read access on projects" 
      ON projects FOR SELECT USING (true);

      CREATE POLICY IF NOT EXISTS "Allow public read access on testimonials" 
      ON testimonials FOR SELECT USING (true);

      CREATE POLICY IF NOT EXISTS "Allow public read access on services" 
      ON services FOR SELECT USING (true);

      -- Create policy for public insert on contact submissions
      CREATE POLICY IF NOT EXISTS "Allow public insert to contact_submissions" 
      ON contact_submissions FOR INSERT WITH CHECK (true);
      `

      // Execute the SQL
      const { error: sqlError } = await supabase.rpc("pgrest_exec", { query: sql })

      if (sqlError) {
        throw new Error(sqlError.message)
      }

      setSuccess(true)

      // Refresh the page after a short delay
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (err: any) {
      console.error("Error setting up database:", err)
      setError(err.message || "An error occurred while setting up the database")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Database Setup</h1>

      <Card>
        <CardHeader>
          <CardTitle>Set Up Your Portfolio Database</CardTitle>
          <CardDescription>This will create all the necessary tables in your Supabase database</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Before you can use your portfolio admin dashboard, you need to set up the database tables. This process
            will:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Create tables for projects, testimonials, services, and contact submissions</li>
            <li>Set up row-level security policies for data protection</li>
            <li>Prepare your database for storing portfolio content</li>
          </ul>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-500 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Database tables have been created successfully. You can now start using your admin dashboard.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin">Cancel</Link>
          </Button>
          <Button onClick={setupDatabase} disabled={loading || success}>
            {loading ? "Setting Up..." : success ? "Setup Complete" : "Set Up Database"}
          </Button>
        </CardFooter>
      </Card>

      {success && (
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/admin">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

