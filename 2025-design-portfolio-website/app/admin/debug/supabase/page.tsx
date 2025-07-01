import { createServerClient } from "@/lib/supabase/server"
import { SupabaseDebugClient } from "@/components/admin/supabase-debug-client"

export default async function SupabaseDebugPage() {
  let connectionStatus = "Unknown"
  let error = null
  const tables = []
  let projectsData = []

  try {
    // Test Supabase connection
    const supabase = await createServerClient()

    // Check if we can connect
    const { data: tablesData, error: tablesError } = await supabase.from("projects").select("*").limit(1)

    if (tablesError) {
      connectionStatus = "Error"
      error = tablesError
    } else {
      connectionStatus = "Connected"

      // Get list of tables
      const { data: tablesList, error: tablesListError } = await supabase.from("projects").select("*").limit(5)

      if (!tablesListError) {
        projectsData = tablesList
      }
    }
  } catch (e) {
    connectionStatus = "Error"
    error = e
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Debug</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Server Connection Status</h2>
        <div className="p-4 bg-white rounded-lg shadow">
          <p>
            Status:{" "}
            <span
              className={connectionStatus === "Connected" ? "text-green-600 font-medium" : "text-red-600 font-medium"}
            >
              {connectionStatus}
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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <div className="p-4 bg-white rounded-lg shadow">
          <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set (hidden)" : "Not set"}</p>
        </div>
      </div>

      {connectionStatus === "Connected" && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Projects Data Preview</h2>
            <div className="p-4 bg-white rounded-lg shadow overflow-auto">
              <pre className="text-sm">{JSON.stringify(projectsData, null, 2)}</pre>
            </div>
          </div>
        </>
      )}

      <SupabaseDebugClient />
    </div>
  )
}
