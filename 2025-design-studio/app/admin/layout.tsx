"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="italic">Checking authentication…</p>
      </div>
    );
  }

  return <>{children}</>;
}
