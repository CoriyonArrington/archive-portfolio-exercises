
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Check, Clock, AlertTriangle, UserMinus, Brain, Frown } from 'lucide-react';

interface ClientProblemProps {
  icon: React.ReactNode;
  problem: string;
  solution: string;
}

/**
 * ClientProblem - Individual client problem and solution card
 */
const ClientProblem = ({ icon, problem, solution }: ClientProblemProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-smooth border border-gray-100 dark:border-gray-700">
      <div className="flex gap-4 mb-4">
        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full h-fit">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">{problem}</h3>
          <div className="flex items-start gap-2 mt-4">
            <Check className="text-green-500 dark:text-green-400 min-w-[20px] mt-1" />
            <p className="text-muted-foreground dark:text-gray-300">{solution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ClientProblemsSection - Highlights common client problems and solutions
 * 
 * This component showcases typical challenges healthcare organizations face
 * and how design services address those issues, focusing on client outcomes.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Descriptive problem-solution pairs
 * - Adequate color contrast
 */
const ClientProblemsSection = () => {
  const clientProblems = [
    {
      icon: <Clock className="w-5 h-5 text-red-500 dark:text-red-400" />,
      problem: "Poor usability is causing workflow inefficiencies",
      solution: "Streamlined interfaces that reduce time-on-task and cognitive load for healthcare providers"
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />,
      problem: "High error rates in critical clinical tasks",
      solution: "Error-prevention design patterns and clear information architecture to enhance patient safety"
    },
    {
      icon: <UserMinus className="w-5 h-5 text-red-500 dark:text-red-400" />,
      problem: "Low adoption rates for digital health tools",
      solution: "Engaging, intuitive experiences that encourage consistent user engagement and retention"
    },
    {
      icon: <Brain className="w-5 h-5 text-red-500 dark:text-red-400" />,
      problem: "Difficulty translating clinical needs to technology",
      solution: "Research-driven design that bridges the gap between healthcare operations and digital solutions"
    },
    {
      icon: <Frown className="w-5 h-5 text-red-500 dark:text-red-400" />,
      problem: "Poor patient satisfaction with digital touchpoints",
      solution: "User-centered design that creates positive, empathetic healthcare experiences"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50" aria-labelledby="client-problems-heading">
      <div className="container">
        <SectionHeading
          title="Common Challenges We Solve"
          description="Healthcare organizations face unique design challenges that require specialized expertise. Here are some of the issues we address together:"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientProblems.map((item, index) => (
            <ClientProblem
              key={index}
              icon={item.icon}
              problem={item.problem}
              solution={item.solution}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientProblemsSection;
