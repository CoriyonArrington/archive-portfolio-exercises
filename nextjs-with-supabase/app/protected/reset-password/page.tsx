// app/protected/reset-password/page.tsx
import type { Metadata } from 'next'; // Added import
import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from '@/config/site'; // Added import

// Added static metadata export
export const metadata: Metadata = {
  title: `Reset Password | ${siteConfig.name}`,
  description: `Complete the password reset process for ${siteConfig.name}.`,
  robots: { index: false, follow: true }, // Discourage indexing
};

// Component props and logic remain the same
export default async function ResetPassword(props: {
  searchParams: Promise<Message>; // Keeping original type
}) {
  const searchParams = await props.searchParams; // Keeping original await
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}