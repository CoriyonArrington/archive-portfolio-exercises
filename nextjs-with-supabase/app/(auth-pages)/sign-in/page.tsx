// app/(auth-pages)/sign-in/page.tsx
import type { Metadata } from 'next'; // Added import
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { siteConfig } from '@/config/site'; // Added import

// Added static metadata export
export const metadata: Metadata = {
  title: `Sign In | ${siteConfig.name}`,
  description: `Sign in to your ${siteConfig.name} account.`,
  robots: { index: false, follow: true }, // Discourage indexing
};

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
       {/* Changed h1 to match metadata title for consistency */}
      <h1 className="text-2xl font-medium">Sign In</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign In {/* Changed Button Text */}
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}