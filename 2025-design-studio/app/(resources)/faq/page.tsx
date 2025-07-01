// app/(resources)/faq/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { supabase } from "@/lib/utils/supabaseClient";
import FaqFilter, { Faq } from "@/components/ui/faq-filter";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  // 1) Fetch CMS page content
  const { data: page } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "faq")
    .single();
  const content = page?.content ?? {};

  // 2) Hero block (if you still need it)
  const hero = {
    headline: (content.hero?.headline as string) ?? "",
    subheadline: (content.hero?.subheadline as string) ?? "",
    cta: Array.isArray(content.hero?.cta) ? (content.hero.cta as string[]) : [],
  };

  // 3) Section metadata for FAQ list
  const section = {
    headline: (content.section?.headline as string) ?? "Frequently Asked Questions",
    body: (content.section?.body as string) ?? "",
  };

  // 4) Fetch FAQs tagged for this page
  const { data: faqRows } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .contains("page_slugs", ["faq"])
    .order("id", { ascending: true });
  const faqs: Faq[] = faqRows ?? [];

  // 5) Your nav links
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

      <main className="py-16 px-4 max-w-screen-lg mx-auto space-y-12">
        {/* Hero (optional) */}
        {hero.headline && (
          <section className="text-center space-y-4">
            <h1 className="text-3xl font-bold">{hero.headline}</h1>
            <p className="text-lg text-gray-700">{hero.subheadline}</p>
          </section>
        )}

        {/* FAQ Section Header */}
        <section className="space-y-4">
          {section.body && <p className="text-gray-600">{section.body}</p>}
        </section>

        {/* Filter + List (renders only once) */}
        <FaqFilter faqs={faqs} />
      </main>

      <Footer routes={routes} />
    </>
  );
}
