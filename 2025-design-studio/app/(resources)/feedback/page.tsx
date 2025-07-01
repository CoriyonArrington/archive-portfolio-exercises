// app/(resources)/feedback/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { supabase } from "@/lib/utils/supabaseClient";
import NotificationModal from "@/components/common/notification-modal";
import FeedbackForm from "@/components/forms/feedback-form";

export const dynamic = "force-dynamic";

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;

  // Fetch CMS page content
  const { data: page } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "feedback")
    .single();
  const content = page?.content ?? {};

  // Hero payload
  const hero = {
    headline: (content.hero?.headline as string) ?? "",
    body: (content.hero?.body as string) ?? "",
    cta: Array.isArray(content.hero?.cta) ? (content.hero.cta as string[]) : [],
  };

  // Location note
  const locationText = (content.location?.body as string) ?? "";

  // Form fields tuple
  const rawFields = Array.isArray(content.formFields)
    ? (content.formFields as string[])
    : [];
  const formFields: [string, string, string] =
    rawFields.length >= 3
      ? [rawFields[0], rawFields[1], rawFields[2]]
      : ["Clarity", "Usefulness", "Comments"];

  const routes = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Header routes={routes} />

      <main className="py-16 px-4">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Hero */}
          <h1 className="text-3xl font-bold text-center">
            {hero.headline}
          </h1>
          <p className="text-center">{hero.body}</p>

          {/* Notifications */}
          {success && (
            <NotificationModal
              variant="success"
              message="Thanks! Your feedback has been submitted."
            />
          )}
          {error && (
            <NotificationModal
              variant="error"
              title="Submission Error"
              message={error}
            />
          )}

          {/* Feedback form */}
          <FeedbackForm formFields={formFields} />

          {/* Location text */}
          {locationText && (
            <p className="text-center text-sm text-gray-600">
              {locationText}
            </p>
          )}
        </div>
      </main>

      <Footer routes={routes} />
    </>
  );
}
