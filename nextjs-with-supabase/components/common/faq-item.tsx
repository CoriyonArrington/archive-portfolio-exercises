// components/common/faq-item.tsx (Refined Trigger for Left-Aligned Text)
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import type { FaqItemProps } from '@/types/faq';

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer, className }) => {
  return (
    <AccordionItem value={id} className={cn(className)}>
      {/*
        AccordionTrigger by default is: "flex flex-1 items-center justify-between py-4 font-medium ..."
        The text part of the trigger content needs to be explicitly left-aligned.
        We can achieve this by ensuring the text container inside the trigger (if any) is text-left,
        or by ensuring the trigger itself has text-left applied to the text part.
      */}
      <AccordionTrigger
        // We keep justify-between to push the chevron icon to the right.
        // Add text-left here, which will apply to the text content.
        // The span inside will by default take the width of its content.
        // If text wraps, it will wrap left-aligned.
        className="text-left"
      >
        {/* The text is already the first child of the flex container in AccordionTrigger,
            so text-left on the trigger should suffice for its text content.
            No extra span is strictly necessary for just text-align.
        */}
        {question ?? 'No Question Provided'}
      </AccordionTrigger>
      <AccordionContent>
        <div className="prose dark:prose-invert max-w-none">
           <p>{answer ?? 'No Answer Provided'}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqItem;