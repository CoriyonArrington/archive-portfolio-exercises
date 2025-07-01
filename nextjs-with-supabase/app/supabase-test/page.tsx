// app/supabase-test/page.tsx
import type { Metadata } from 'next'; // Added import
import React from "react";
import Link from "next/link";
import { FaqDisplayAndInteractionClient } from "./faq-client-component";
import { createClient } from "@/utils/supabase/server";
import { Section } from "@/components/ui/section";
import { Database } from "@/types/supabase";
import { siteConfig } from '@/config/site'; // Added import

// Import migrated components
import ProjectCard from "@/components/common/project-card";
import { TestimonialCard } from "@/components/common/testimonial-card";
import FaqItem from "@/components/common/faq-item";
import DesignProcess from "@/components/common/design-process";
import { Accordion } from "@/components/ui/accordion";
import FaqFilter from "@/components/common/faq-filter";
import { ToastDemoClient } from "./toast-demo-client";
import { SignOutDemoClient } from "./sign-out-demo-client";

// Added static metadata export
export const metadata: Metadata = {
  title: `Supabase Test Page | ${siteConfig.name}`,
  description: `Test page for Supabase and component integration for ${siteConfig.name}.`,
  robots: { index: false, follow: false }, // Discourage indexing and following links
};


// Types and Mock Data (remain the same)
type Faq = Database['public']['Tables']['faqs']['Row'];
type Project = { id: string; title: string; description: string | null; slug: string; tags?: string[] | null; };
type Testimonial = { id: string; name: string; role: string | null; quote: string; imageUrl?: string | null; };
type ProcessPhase = { id: string; phase_title: string; description: string; };
const mockProjects: Project[] = [
  { id: '1', title: 'E-commerce Platform', description: 'Full-stack Next.js app.', slug: 'ecom', tags: ['Next.js', 'Supabase', 'Tailwind'] },
  { id: '2', title: 'SaaS Dashboard', description: 'Data visualization focus.', slug: 'saas', tags: ['React', 'Charts', 'UI/UX'] },
];
const mockTestimonials: Testimonial[] = [
  { id: 't1', name: 'Alice Smith', role: 'CEO, Tech Inc.', quote: 'Working with them was a breeze!', imageUrl: 'https://via.placeholder.com/64' },
  { id: 't2', name: 'Bob Johnson', role: 'CTO, Startup Co.', quote: 'Delivered results beyond expectations.' },
];
const mockProcess: ProcessPhase[] = [
  { id: 'p1', phase_title: 'Discovery', description: 'Understanding project goals and user needs.' },
  { id: 'p2', phase_title: 'Design', description: 'Creating wireframes, mockups, and prototypes.' },
  { id: 'p3', phase_title: 'Development', description: 'Building the application with clean code.' },
  { id: 'p4', phase_title: 'Testing & Launch', description: 'Ensuring quality and deploying the final product.' },
];
const mockSingleFaqRequiredProps = {
  id: 'faq-single',
  question: 'What is Shadcn UI?',
  answer: 'An open-source component library built on Tailwind CSS and Radix UI.'
};


export default async function SupabaseTestPage() {
  const supabase = await createClient();
  const { data: faqs, error } = await supabase.from("faqs").select("*").returns<Faq[]>();

  if (error) { console.error("Error fetching FAQs:", error); }
  const initialDataForClient: Faq[] | null = faqs ?? null;
  const allFaqsForFilter: Faq[] = faqs ?? [];

  return (
    <>
      <Section id="intro" padding="sm" background="muted">
        <h1 className="text-3xl font-bold mb-4">Supabase & Shadcn UI Test Page</h1>
        <p>Testing migrated common components & replacements.</p>
        <p>Back to <Link href="/" className="underline">Home</Link></p>
      </Section>

      {/* --- Project Card Test --- */}
      <Section id="projects-test" title="Project Card Test">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProjects.map((project) => (<ProjectCard key={project.id} {...project} />))}
        </div>
      </Section>

      {/* --- Testimonial Card Test --- */}
      <Section id="testimonials-test" title="Testimonial Card Test" background="accent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTestimonials.map((testimonial) => (<TestimonialCard key={testimonial.id} {...testimonial} />))}
        </div>
      </Section>

      {/* --- Design Process Test --- */}
      <Section id="design-process-test" title="Design Process Test">
        <DesignProcess processPhases={mockProcess} />
      </Section>

      {/* --- FAQ Filter Test --- */}
      <Section id="faq-filter-test" title="FAQ Filter Test" background="muted">
        <FaqFilter faqs={allFaqsForFilter} />
      </Section>

      {/* --- FAQ Item (Accordion) Test --- */}
      <Section id="faq-item-test" title="FAQ Item (Accordion) Test">
        <Accordion type="single" collapsible className="w-full">
          <FaqItem {...mockSingleFaqRequiredProps} />
          {initialDataForClient?.slice(0, 1).map(faq => (
              <FaqItem key={faq.id} id={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </Accordion>
      </Section>

      {/* --- Toast Demo (Replaces NotificationModal) --- */}
      <Section id="toast-test" title="Toast Notification Test (Replaces Modal)">
          <ToastDemoClient />
      </Section>

      {/* --- Sign Out Demo (Replaces SignOutButton) --- */}
      <Section id="signout-test" title="Sign Out Button Test" background="accent">
          <SignOutDemoClient />
          <p className="text-sm mt-2">Note: Actual sign-out should likely be in the main header.</p>
      </Section>

      {/* --- Original FAQ Display (Client Component) --- */}
      <Section id="data-display" title="Original Data Display (Fetched FAQs in Client Component)">
        <FaqDisplayAndInteractionClient initialData={initialDataForClient} />
      </Section>

      <Section id="plain-section" padding="sm">
        <h2 className="text-2xl font-semibold mb-2">A Plain Section</h2>
      </Section>
    </>
  );
}