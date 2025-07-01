
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { CheckCircle } from 'lucide-react';

/**
 * PricingCard - Individual pricing tier card
 */
interface ValuePropProps {
  title: string;
  features: string[];
  highlighted?: boolean;
}

const ValuePropCard = ({ title, features, highlighted = false }: ValuePropProps) => {
  return (
    <div 
      className={`relative rounded-2xl p-8 flex flex-col h-full ${
        highlighted 
          ? 'bg-primary text-primary-foreground shadow-lg border-2 border-primary' 
          : 'bg-white dark:bg-gray-800 shadow-smooth border border-gray-100 dark:border-gray-700'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Unique Approach
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-6 ${highlighted ? 'text-white' : 'dark:text-white'}`}>
        {title}
      </h3>
      
      <ul className="space-y-3 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              highlighted ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'
            }`} />
            <span className={highlighted ? 'text-white' : 'dark:text-gray-300'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * WhatsUnique - "What Sets Me Apart" section
 * 
 * Displays key differentiators that make the designer's approach unique.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Clear section labels
 * - High contrast for readability
 */
const WhatsUnique = () => {
  return (
    <div className="mb-24">
      <SectionHeading 
        title="What Sets Me Apart"
        description="My unique approach to healthcare UX design combines clinical knowledge with user-centered design practices."
        align="left"
        className="mb-12"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ValuePropCard 
          title="Healthcare Expertise"
          features={[
            "Clinical background and healthcare industry knowledge",
            "Deep understanding of medical workflows and user needs",
            "Familiarity with healthcare regulations and compliance",
            "Experience designing for clinicians and patients",
            "Ability to translate complex medical concepts into intuitive UX"
          ]}
        />
        
        <ValuePropCard 
          title="User-Centered Approach"
          features={[
            "Extensive user research and usability testing",
            "Focus on accessibility and inclusive design",
            "Data-driven decision making process",
            "Collaborative design workshops with stakeholders",
            "Iterative design methodology based on user feedback"
          ]}
          highlighted={true}
        />
        
        <ValuePropCard 
          title="Technical Excellence"
          features={[
            "Proficiency in design systems and component libraries",
            "Ability to prototype complex interactions",
            "Effective collaboration with engineering teams",
            "Understanding of technical constraints and possibilities",
            "Expertise in responsive and adaptive design solutions"
          ]}
        />
      </div>
    </div>
  );
};

export default WhatsUnique;
