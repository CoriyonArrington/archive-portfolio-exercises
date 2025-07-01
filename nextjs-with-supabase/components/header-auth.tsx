// components/header-auth.tsx (Or wherever AuthButton is defined - Updated)

import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

// Assuming this is components/header-auth.tsx based on layout import
export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- Env Var Check Section (No changes needed here) ---
  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"} disabled className="opacity-75 cursor-none pointer-events-none" >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"} disabled className="opacity-75 cursor-none pointer-events-none" >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // --- Signed In / Signed Out Logic ---
  return user ? (
    // User is signed in
    <div className="flex items-center gap-4">
      {/* --- MODIFIED HERE: Added span with truncate --- */}
      {/* Wrap email in a span, add truncate, optional responsive hiding */}
      <span className="hidden sm:inline truncate" title={user.email ?? ''}> {/* Show on sm screens and up, truncate if needed */}
         Hey, {user.email}!
      </span>
      {/* --- End Modification --- */}
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"} size="sm"> {/* Consistent button size */}
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    // User is signed out
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}