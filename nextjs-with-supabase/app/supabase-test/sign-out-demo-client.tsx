// app/supabase-test/sign-out-demo-client.tsx - Added export
"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

// FIX: Added 'export' here
export function SignOutDemoClient() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign Out (Test Button)
    </Button>
  );
}