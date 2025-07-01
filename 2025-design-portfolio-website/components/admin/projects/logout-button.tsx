"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // Redirect to login page
        router.push("/admin/login")
      } else {
        console.error("Failed to logout")
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm">
      Logout
    </Button>
  )
}

