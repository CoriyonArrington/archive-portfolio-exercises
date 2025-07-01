"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <button
      onClick={handleSignOut}
      className="mt-6 w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600"
    >
      Sign Out
    </button>
  );
}
