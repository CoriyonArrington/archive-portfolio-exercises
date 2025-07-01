
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BadgeCheck } from 'lucide-react';

/**
 * ClientValueProposition - Highlights the value clients receive
 * 
 * This component showcases the key benefits and outcomes that clients
 * can expect when working with Coriyon, focusing on their specific needs
 * and how those needs are addressed.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA attributes for non-text content
 * - Clear visual organization
 */
const ClientValueProposition = () => {
  const valuePoints = [
    "Transform complex healthcare workflows into intuitive experiences",
    "Reduce clinician burnout through user-centered design",
    "Increase patient engagement with accessible digital solutions",
    "Validate concepts quickly through research-driven design",
    "Align stakeholders around evidence-based product decisions",
    "Create consistent experiences across all digital touchpoints"
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50" aria-labelledby="value-heading">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="Transform Healthcare Experiences"
              description="I help healthcare organizations solve complex UX challenges with specialized design solutions that directly impact clinical outcomes and business results."
              align="left"
              className="mb-8"
            />
            
            <ul className="space-y-4">
              {valuePoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <BadgeCheck className="h-6 w-6 text-highlight flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600 shadow-smooth">
            <div className="flex flex-col gap-6">
              <div className="bg-soft-purple dark:bg-purple-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">For Healthcare Product Teams</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  "Before working with Coriyon, our clinical users were frustrated with our application. After his redesign, task completion increased by 47% and training time was cut in half."
                </p>
              </div>
              
              <div className="bg-soft-blue dark:bg-blue-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">For Healthcare Startups</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  "Coriyon helped us validate our concept with actual healthcare providers. His research-driven approach saved us from building features users didn't need and focused our limited resources on what mattered."
                </p>
              </div>
              
              <div className="bg-soft-green dark:bg-green-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">For Enterprise Health Systems</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  "Our patient portal redesign led to a 68% increase in digital appointment scheduling and reduced call center volume by 23%. The ROI on our design investment was achieved in just 4 months."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientValueProposition;
