// components/page-sections/faq-section.tsx
import React from 'react'
import FaqCard from '@/components/common/faq-card'
import { FaqSectionProps } from '@/types/faq'

export default function FaqSection({
  faqs,
  headline,
  body,
  cta,
}: FaqSectionProps) {
  return (
    <section id="faq">
      <h2>{headline}</h2>
      <p>{body}</p>
      <div>
        {faqs.map((faq) => (
          <FaqCard
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
      <a href="#">{cta}</a>
    </section>
  )
}
