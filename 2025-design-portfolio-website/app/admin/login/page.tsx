import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import LoginForm from "@/components/admin/login-form"

export default async function LoginPage() {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getSession()

  // If user is already logged in, redirect to dashboard
  if (data?.session) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to access the admin portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
