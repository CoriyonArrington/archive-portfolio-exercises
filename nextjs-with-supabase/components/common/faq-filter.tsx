// components/common/faq-filter.tsx (Updated)
"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import FaqItem from "@/components/common/faq-item";
import { P } from '@/components/typography'; // Import P
import { cn } from '@/lib/utils'; // Import cn
// Import the shared Faq type and Props type
import type { Faq, FaqFilterProps } from '@/types/faq';

// Remove local Faq definition

export default function FaqFilter({ faqs, className }: FaqFilterProps) { // Add className prop
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filteredFaqs = (faqs ?? []).filter((f) =>
    f.question?.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    // Use cn for className merging
    <div className={cn("space-y-4", className)}>
      <Input
        type="text"
        placeholder="Search FAQs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      <Accordion type="single" collapsible className="w-full space-y-2">
        {filteredFaqs.map((f) => (
          <FaqItem key={f.id} id={f.id} question={f.question} answer={f.answer} />
        ))}

        {/* Use P component for messages */}
        {filteredFaqs.length === 0 && debouncedQuery && (
          <P className="italic text-muted-foreground pt-4">
            No FAQs match your search for &quot;{debouncedQuery}&quot;.
          </P>
        )}
        {filteredFaqs.length === 0 && !debouncedQuery && faqs.length === 0 && (
          <P className="italic text-muted-foreground pt-4">
            There are no FAQs to display.
          </P>
        )}
      </Accordion>
    </div>
  );
}