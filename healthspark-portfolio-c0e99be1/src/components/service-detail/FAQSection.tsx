
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

/**
 * FAQSection - Displays frequently asked questions
 * 
 * Shows common questions and answers related to the service
 * in an accordion format for better user experience.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA attributes for accordions
 * - Keyboard navigation
 * - Focus management
 */
const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first FAQ by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-16 border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="faq-section-title"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            id="faq-section-title" 
            className="text-3xl font-bold mb-4 dark:text-white"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground dark:text-gray-300">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md"
            >
              <h3 className="w-full m-0">
                <button
                  className="flex justify-between items-center w-full p-5 text-left text-xl font-semibold dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-gray-400 dark:text-gray-300">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>
              </h3>
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openIndex !== index}
              >
                <div className="p-5 pt-0 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
