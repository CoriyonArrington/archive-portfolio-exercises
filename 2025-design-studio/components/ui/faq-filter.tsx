// components/ui/faq-filter.tsx
"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

interface FaqFilterProps {
  faqs: Faq[];
}

export default function FaqFilter({ faqs }: FaqFilterProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search FAQs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <ul className="space-y-6">
        {filtered.map((f) => (
          <li key={f.id}>
            <h3 className="font-semibold">{f.question}</h3>
            <p className="mt-1 text-gray-700">{f.answer}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="italic text-gray-500">No matching FAQs.</li>
        )}
      </ul>
    </div>
  );
}
