"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSideClient } from "@/lib/supabase/client"
import { AdminLayout } from "@/components/admin/layout/admin-layout"

export default function CreateProcessTablePage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const createTable = async () => {
    setIsCreating(true)
    setError(null)
    setResult(null)

    try {
      const supabase = createClientSideClient()

      // Try to create the process_steps table
      const { error: createError } = await supabase.rpc("create_process_steps_table")

      if (createError) {
        // If the RPC function doesn't exist, show instructions
        setError(`Could not automatically create table: ${createError.message}`)
        setResult("Please run the SQL script in the Supabase SQL Editor.")
      } else {
        setResult("Table created successfully!")
        setTimeout(() => {
          router.push("/admin/process")
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create Process Steps Table</h1>

        <div className="bg-yellow-50 p-4 rounded-md">
          <p className="text-yellow-700">
            The process_steps table doesn't exist in your database. You need to create it before you can manage process
            phases.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Option 1: Automatic Creation</h2>
          <p>Try to create the table automatically:</p>
          <button
            onClick={createTable}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Table"}
          </button>

          {result && <div className="bg-green-50 p-4 rounded-md text-green-700">{result}</div>}

          {error && <div className="bg-red-50 p-4 rounded-md text-red-500">{error}</div>}

          <h2 className="text-xl font-semibold pt-4">Option 2: Manual Creation</h2>
          <p>Copy and run the following SQL in the Supabase SQL Editor:</p>

          <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
              {`-- Create the process_steps table
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase_title TEXT NOT NULL,
  phase_subtitle TEXT,
  phase_description TEXT NOT NULL,
  steps JSONB,
  image_url TEXT,
  quote_text TEXT,
  quote_author TEXT,
  outputs JSONB,
  insights JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a sample process phase
INSERT INTO process_steps (
  phase_title,
  phase_subtitle,
  phase_description,
  steps,
  image_url,
  quote_text,
  quote_author,
  outputs,
  insights,
  display_order
) VALUES (
  'Discovery',
  'Understanding your needs',
  'The first phase of our process involves understanding your business, goals, and requirements.',
  '[{"title": "Initial Consultation", "description": "We meet to discuss your project needs and goals."}, {"title": "Research", "description": "We research your industry, competitors, and target audience."}, {"title": "Requirements Gathering", "description": "We document all requirements and specifications."}]',
  '/images/discovery.jpg',
  'The discovery phase was incredibly thorough and helped us clarify our vision.',
  'John Smith, CEO',
  '["Project Brief", "Requirements Document", "Competitive Analysis"]',
  '["Understanding user needs is critical", "Clear goals lead to better outcomes", "Research saves time in the long run"]',
  1
);`}
            </pre>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => router.push("/admin/process")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
            Back to Process Phases
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
