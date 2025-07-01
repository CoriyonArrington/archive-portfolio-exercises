
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Award } from 'lucide-react';

/**
 * SkillCard - Individual skill category card
 * 
 * Displays a card with skill category title and list of skills.
 * 
 * @param {string} title - The title of the skill category
 * @param {string[]} skills - Array of skill items to display
 */
interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard = ({ title, skills }: SkillCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-smooth hover:shadow-card transition-shadow"
      aria-labelledby={`skill-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
        <Award className="h-6 w-6 hover:opacity-80 transition-opacity" aria-hidden="true" />
      </div>
      <h3 
        id={`skill-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-xl font-semibold mb-4 dark:text-white"
      >
        {title}
      </h3>
      <ul className="space-y-2" aria-label={`${title} skills list`}>
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true"></span>
            <span className="dark:text-gray-300">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * SkillsExpertise - Skills and expertise section
 * 
 * Displays a grid of skills categorized into design skills, research methods, and tools.
 * 
 * Accessibility features:
 * - Semantic HTML with appropriate headings hierarchy
 * - ARIA labels for lists
 * - High contrast text for readability
 * - Hover effects for interactive elements
 * - Responsive grid layout for all device sizes
 */
const SkillsExpertise = () => {
  // Skills data organized by category
  const designSkills = [
    "User Experience Design",
    "User Interface Design",
    "Information Architecture",
    "Design Systems",
    "Interaction Design",
    "Visual Design"
  ];
  
  const researchMethods = [
    "User Interviews",
    "Usability Testing",
    "Contextual Inquiry",
    "Stakeholder Interviews",
    "Survey Design",
    "Competitive Analysis"
  ];
  
  const tools = [
    "Figma",
    "Sketch",
    "Adobe Creative Suite",
    "Protopie",
    "Miro",
    "Notion"
  ];

  return (
    <div className="mb-24">
      <SectionHeading 
        title="Skills & Expertise"
        align="left"
        className="mb-10"
      />
      
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        aria-label="Skills and expertise categories"
      >
        <SkillCard title="Design Skills" skills={designSkills} />
        <SkillCard title="Research Methods" skills={researchMethods} />
        <SkillCard title="Tools" skills={tools} />
      </div>
    </div>
  );
};

export default SkillsExpertise;
