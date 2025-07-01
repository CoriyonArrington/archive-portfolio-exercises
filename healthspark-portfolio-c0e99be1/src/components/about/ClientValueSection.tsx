
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { GraduationCap, Lightbulb, Users, Clock, BadgeCheck, LineChart } from 'lucide-react';

interface ValuePropositionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * ValueProposition - Individual value proposition card
 */
const ValueProposition = ({ icon, title, description }: ValuePropositionProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-smooth hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="bg-highlight/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-muted-foreground dark:text-gray-300">{description}</p>
    </div>
  );
};

/**
 * ClientValueSection - Highlights the value provided to clients
 * 
 * This component showcases the key benefits clients receive when working
 * with Coriyon, focusing on outcomes and value delivery rather than services.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Clear visual organization
 * - Adequate contrast for readability
 */
const ClientValueSection = () => {
  const valuePropositions = [
    {
      icon: <GraduationCap className="w-6 h-6 text-highlight" />,
      title: "Healthcare Domain Expertise",
      description: "Benefit from specialized knowledge of healthcare workflows and user needs, resulting in designs that truly resonate with clinical users."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-highlight" />,
      title: "Evidence-Based Approach",
      description: "Receive solutions grounded in research and testing, not assumptions, ensuring your product actually solves real user problems."
    },
    {
      icon: <Users className="w-6 h-6 text-highlight" />,
      title: "Stakeholder Alignment",
      description: "Experience a collaborative process that brings together clinical, business, and technical perspectives for unified product direction."
    },
    {
      icon: <Clock className="w-6 h-6 text-highlight" />,
      title: "Accelerated Timeline",
      description: "Get to market faster with an efficient design process that eliminates unnecessary revisions and streamlines decision-making."
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-highlight" />,
      title: "Regulatory Confidence",
      description: "Work with a designer familiar with healthcare compliance requirements, reducing risk in your development process."
    },
    {
      icon: <LineChart className="w-6 h-6 text-highlight" />,
      title: "Measurable Outcomes",
      description: "See tangible improvement in key metrics like user satisfaction, adoption rates, error reduction, and time-on-task."
    }
  ];

  return (
    <section className="mb-24" aria-labelledby="client-value-heading">
      <SectionHeading
        title="The Value You Receive"
        description="When we work together, you gain more than just visually appealing interfaces. Here's how our partnership delivers real value for your organization:"
        align="left"
        className="mb-12"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {valuePropositions.map((prop, index) => (
          <ValueProposition
            key={index}
            icon={prop.icon}
            title={prop.title}
            description={prop.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientValueSection;
