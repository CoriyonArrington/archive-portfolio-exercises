// app/(main)/contact/page.tsx
import { supabase } from "@/lib/utils/supabaseClient";
import Hero from "@/components/page-sections/home-hero";
import ContactForm from "@/components/forms/contact-form";

export default async function ContactPage() {
  // Fetch the CMS entry for the Contact page
  const { data: page, error } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "contact")
    .single(); 

  if (error) {
    console.error("Error fetching contact page content:", error);
  }

  // Pull out the hero block and contact field labels from the JSONB `content`
  const content = page?.content ?? {};
  const hero = content.hero || {
    headline: "Get in Touch",
    subheadline: "We'd love to hear from you",
    cta: "",
  };
  const fields = (content.contactFields ?? [
    "Your Name",
    "Your Email",
    "Your Message",
  ]) as [string, string, string];

  return (
    <main>
      {/* Dynamic hero section */}
      <Hero
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={hero.cta}
      />

      {/* Contact form with exactly three labels */}
      <ContactForm fields={fields} />
    </main>
  );
}
