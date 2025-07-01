"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSideClient } from "@/lib/supabase/client"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function signOut() {
      const supabase = createClientSideClient()
      await supabase.auth.signOut()
      router.push("/admin/login")
    }

    signOut()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Signing out...</p>
      </div>
    </div>
  )
}
