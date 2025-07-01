// app/(auth-pages)/sign-up/page.tsx
import type { Metadata } from 'next'; // Added import for Metadata
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message"; // Keep existing Message import
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { siteConfig } from '@/config/site'; // Added import for siteConfig

// Added static metadata export (Minimal Change)
export const metadata: Metadata = {
  title: `Sign Up | ${siteConfig.name}`,
  description: `Create an account for ${siteConfig.name}.`,
  robots: { index: false, follow: true }, // Discourage indexing
};

// Using your original component structure and logic
export default async function Signup(props: {
  searchParams: Promise<Message>; // Keep original props type
}) {
  const searchParams = await props.searchParams; // Keep original await

  // Keep original conditional check based on "message" property
  // (Assuming your Message type or FormMessage component handles this)
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  // Keep original return structure for the form
  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1> {/* Keep original h1 */}
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up {/* Keep original button text */}
          </SubmitButton>
          {/* Keep original FormMessage placement */}
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}