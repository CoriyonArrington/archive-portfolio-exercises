
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  isLast?: boolean;
}

/**
 * TimelineEvent - Individual event in the timeline
 * 
 * @param {string} year - The year when the event occurred
 * @param {string} title - The title of the event
 * @param {string} description - A description of the event
 * @param {boolean} isLast - Whether this is the last event in the timeline
 */
const TimelineEvent = ({ year, title, description, isLast = false }: TimelineEventProps) => {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline vertical line */}
      {!isLast && (
        <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white dark:border-gray-900">
        <span className="text-white text-xs font-bold">{year}</span>
      </div>
      
      {/* Timeline content */}
      <div className="ml-4">
        <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
        <p className="text-muted-foreground dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

/**
 * DesignJourney - Timeline of design career milestones
 * 
 * Displays a vertical timeline showing the designer's professional journey.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear visual hierarchy
 * - High contrast for readability
 */
const DesignJourney = () => {
  const timelineEvents = [
    {
      year: "2015",
      title: "Began Healthcare Journey",
      description: "Started my career in healthcare as a medical researcher, gaining valuable insights into patient care workflows and clinical needs."
    },
    {
      year: "2017",
      title: "Transition to UX Design",
      description: "Pivoted to UX design, bringing clinical expertise to solving complex healthcare design challenges and improving medical software interfaces."
    },
    {
      year: "2019",
      title: "Lead Designer at HealthTech",
      description: "Led the redesign of patient-facing applications at a major health tech company, resulting in a 42% improvement in user satisfaction scores."
    },
    {
      year: "2020",
      title: "Telehealth Expertise",
      description: "Specialized in telehealth solutions during the pandemic, designing remote care platforms that served over 100,000 patients."
    },
    {
      year: "2022",
      title: "Independent Consultant",
      description: "Launched my independent healthcare UX consultancy, partnering with innovative companies to improve clinical workflows and patient experiences."
    },
    {
      year: "Now",
      title: "Current Focus",
      description: "Currently focused on designing inclusive healthcare experiences that bridge the digital divide and improve access to care for all users."
    }
  ];
  
  return (
    <div className="mb-24">
      <SectionHeading 
        title="My Design Journey"
        description="A timeline of my career from clinical healthcare to specialized UX design"
        align="left"
        className="mb-12"
      />
      
      <div className="relative">
        {timelineEvents.map((event, index) => (
          <TimelineEvent 
            key={index}
            year={event.year}
            title={event.title}
            description={event.description}
            isLast={index === timelineEvents.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignJourney;
