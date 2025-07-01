
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ClipboardList, Search, Lightbulb, Figma, TestTube, ArrowRightLeft } from 'lucide-react';

interface ProcessStepProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
}

/**
 * ProcessStep - Individual process step in the client journey
 */
const ProcessStep = ({ icon, step, title, description }: ProcessStepProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-highlight text-white rounded-full flex items-center justify-center font-bold text-lg">
          {step}
        </div>
      </div>
      <div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-muted-foreground dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

/**
 * WorkingProcessSection - Showcases the client experience working together
 * 
 * This component provides a clear roadmap of what clients can expect when
 * working together, giving them a sense of structure and predictability.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Numerical markers for process sequence
 * - Clear visual hierarchy
 * - Descriptive text for each step
 */
const WorkingProcessSection = () => {
  const processSteps = [
    {
      icon: <ClipboardList className="w-6 h-6 text-highlight" />,
      title: "Discovery Consultation",
      description: "We start with a free consultation to understand your challenges, goals, and current situation. This helps determine if we're a good fit to work together."
    },
    {
      icon: <Search className="w-6 h-6 text-highlight" />,
      title: "Research & Analysis",
      description: "I conduct targeted research to understand your users, business context, and technical constraints, uncovering insights that drive the design direction."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-highlight" />,
      title: "Strategy & Planning",
      description: "Together, we develop a strategic approach to address your specific challenges, with clear objectives, timeline, and success metrics."
    },
    {
      icon: <Figma className="w-6 h-6 text-highlight" />,
      title: "Design & Iteration",
      description: "I create and refine solutions through an iterative process, with regular check-ins and feedback sessions to ensure alignment with your goals."
    },
    {
      icon: <TestTube className="w-6 h-6 text-highlight" />,
      title: "Validation & Testing",
      description: "Designs are tested with real users to validate effectiveness and identify opportunities for improvement before implementation."
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6 text-highlight" />,
      title: "Implementation Support",
      description: "I work closely with your development team to ensure design intent is maintained during implementation and help resolve any challenges that arise."
    }
  ];

  return (
    <section className="py-20" aria-labelledby="process-heading">
      <div className="container">
        <SectionHeading
          title="What It's Like to Work Together"
          description="A structured, collaborative process that keeps you involved and informed at every stage, ensuring we stay aligned with your goals."
          className="mb-16"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto dark:text-gray-300">
            Want to learn more about how we can work together to solve your healthcare UX challenges?
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/process">
              Explore the full process
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcessSection;
